import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

// 1. Configuración de CORS: Es como el patovica del servidor. 
// Le decimos que deje pasar las peticiones que vienen desde tu web (React).
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Manejo previo del CORS (peticiones OPTIONS de los navegadores)
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 2. Leemos los datos que nos va a mandar React cuando la usuaria haga clic en "Comprar"
    const { titulo, precio } = await req.json()

    // 3. Buscamos tu Llave Maestra de Mercado Pago. 
    // Fiajte que NO está escrita en el código, sino escondida en una variable de entorno por seguridad.
    const MP_ACCESS_TOKEN = Deno.env.get('MP_ACCESS_TOKEN')

    // 4. Armamos la "Preferencia" (la factura invisible que exige Mercado Pago)
    const bodyMercadoPago = {
      items: [
        {
          title: titulo,
          description: 'Cuadernillo Digital - Nexo Psico',
          quantity: 1,
          currency_id: 'ARS',
          unit_price: Number(precio),
        },
      ],
      // A dónde vuelve la usuaria después de pagar en Mercado Pago
      back_urls: {
        success: "https://nexopsico.vercel.app/perfil", 
        failure: "https://nexopsico.vercel.app/",
        pending: "https://nexopsico.vercel.app/"
      },
      auto_return: "approved",
    }

    // 5. Nos comunicamos oficialmente con los servidores de Mercado Pago
    const mpResponse = await fetch('https://api.mercadopago.com/checkout/preferences', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${MP_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyMercadoPago),
    })

    const mpData = await mpResponse.json()

    // 6. Si Mercado Pago nos da el OK, le devolvemos a React el link de pago (init_point)
    return new Response(
      JSON.stringify({ id: mpData.id, init_point: mpData.init_point }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    // Si algo falla, atrapamos el error para que la página no se rompa
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})