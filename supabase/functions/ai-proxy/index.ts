import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    };

    serve(async (req) => {
      if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });
      try {
        const { prompt, systemPrompt, model } = await req.json();
        const apiKey = Deno.env.get('ANTHROPIC_API_KEY');
        if (!apiKey) {
          return new Response(JSON.stringify({ error: 'ANTHROPIC_API_KEY not set. Go to Supabase Dashboard → Settings → Edge Functions → Secrets and add ANTHROPIC_API_KEY.' }), { status: 501, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: { 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
          body: JSON.stringify({ model: model ?? 'claude-haiku-4-5-20251001', max_tokens: 1024, system: systemPrompt ?? 'You are a helpful assistant.', messages: [{ role: 'user', content: prompt }] }),
        });
        const data = await res.json();
        return new Response(JSON.stringify(data), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      } catch (e) {
        return new Response(JSON.stringify({ error: String(e) }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    });