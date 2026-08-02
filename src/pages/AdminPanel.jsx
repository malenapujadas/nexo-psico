import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';

export const AdminPanel = () => {
  const navigate = useNavigate();
  
  const [verificando, setVerificando] = useState(true);
  
  // ESTADO PARA LAS PESTAÑAS
  const [pestañaActiva, setPestañaActiva] = useState('cuadernillos'); // 'cuadernillos', 'ventas', 'usuarios'

  // ESTADOS DE DATOS
  const [productos, setProductos] = useState([]);
  const [ventas, setVentas] = useState([]);
/*   const [usuarios, setUsuarios] = useState([]); */
  
  // ESTADOS DEL MODAL Y FORMULARIO (Cuadernillos)
  const [modalVisible, setModalVisible] = useState(false);
  const [cargandoGuardar, setCargandoGuardar] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', price: '', tipo: 'cuadernillo', link_drive: '' });
  const [archivoPdf, setArchivoPdf] = useState(null);
  const [archivoImagen, setArchivoImagen] = useState(null);

  // ESTADOS DE FEEDBACK (TOASTS Y POP-UPS)
  const [feedback, setFeedback] = useState({ visible: false, tipo: '', mensaje: '' });
  const [modalConfirmacion, setModalConfirmacion] = useState({ visible: false, id: null, estadoActual: null, titulo: '' });
  const [procesandoEstado, setProcesandoEstado] = useState(false);

  const mostrarFeedback = (tipo, mensaje) => {
    setFeedback({ visible: true, tipo, mensaje });
    setTimeout(() => {
      setFeedback({ visible: false, tipo: '', mensaje: '' });
    }, 4000);
  };

  // FUNCIONES PARA TRAER DATOS
  const fetchProductos = async () => {
    const { data } = await supabase.from('productos').select('*').order('created_at', { ascending: false });
    if (data) setProductos(data);
  };

  const fetchVentas = async () => {
    // Traemos las compras y cruzamos con los nombres de productos (join)
    const { data } = await supabase
      .from('compras')
      .select(`
        id,
        created_at,
        estado_pago,
        cliente_id,
        email_comprador,
        acceso_entregado,
        productos ( title, price, tipo )
      `)
      .order('created_at', { ascending: false });
    if (data) setVentas(data);
  };

  const marcarAccesoEntregado = async (ventaId) => {
    try {
      const { error } = await supabase.from('compras').update({ acceso_entregado: true }).eq('id', ventaId);
      if (error) throw error;
      await fetchVentas();
      mostrarFeedback('exito', 'Marcado como entregado.');
    } catch (error) {
      mostrarFeedback('error', 'Error al marcar como entregado: ' + error.message);
    }
  };

/*   const fetchUsuarios = async () => {
    const { data } = await supabase.from('perfiles_clientes').select('*');
    if (data) setUsuarios(data);
  }; */

  useEffect(() => {
    const verificarAccesoYTraerDatos = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) return navigate('/iniciar-sesion');

        const { data: perfil, error: perfilError } = await supabase
          .from('perfiles_clientes')
          .select('rol')
          .eq('id', session.user.id)
          .single();

        if (perfilError || perfil?.rol !== 'admin') return navigate('/');

        // Si es admin, traemos toda la info para llenar las pestañas
        await fetchProductos();
        await fetchVentas();
        /* await fetchUsuarios(); */

      } catch (error) {
        console.error("Error verificando acceso:", error);
        navigate('/');
      } finally {
        setVerificando(false);
      }
    };
    verificarAccesoYTraerDatos();
  }, [navigate]);


  // ----------------------------------------------------------------
  // LÓGICA DE CUADERNILLOS (Guardar, Editar, Pausar)
  // ----------------------------------------------------------------
  const abrirModalEdicion = (producto) => {
    setProductoAEditar(producto);
    setForm({
      title: producto.title || '',
      description: producto.description || '',
      price: producto.price || '',
      tipo: producto.tipo || 'cuadernillo',
      link_drive: producto.link_drive || ''
    });
    setArchivoPdf(null);
    setArchivoImagen(null);
    setModalVisible(true);
  };

  const abrirModalCreacion = () => {
    setProductoAEditar(null);
    setForm({ title: '', description: '', price: '', tipo: 'cuadernillo', link_drive: '' });
    setArchivoPdf(null);
    setArchivoImagen(null);
    setModalVisible(true);
  };

  const handleGuardar = async (e) => {
    e.preventDefault();
    if (!form.title || !form.price || (!productoAEditar && !archivoPdf)) {
      mostrarFeedback('error', 'Por favor completá los datos requeridos.');
      return;
    }
    setCargandoGuardar(true);
    try {
      let finalPdfUrl = productoAEditar ? productoAEditar.pdf_url : null;
      let finalImageUrl = productoAEditar ? productoAEditar.image_url : null;

      if (archivoPdf) {
        const nombrePdfLimpio = archivoPdf.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
        const rutaPdfSegura = `archivos/${Date.now()}-${nombrePdfLimpio}`;
        const { error: uploadPdfError } = await supabase.storage.from('cuadernillos').upload(rutaPdfSegura, archivoPdf);
        if (uploadPdfError) throw uploadPdfError;
        const { data: publicPdfUrl } = supabase.storage.from('cuadernillos').getPublicUrl(rutaPdfSegura);
        finalPdfUrl = publicPdfUrl.publicUrl;
      }

      if (archivoImagen) {
        const nombreImgLimpio = archivoImagen.name.replace(/[^a-zA-Z0-9.\-_]/g, '');
        const rutaImgSegura = `portadas/${Date.now()}-${nombreImgLimpio}`;
        const { error: uploadImgError } = await supabase.storage.from('cuadernillos').upload(rutaImgSegura, archivoImagen);
        if (uploadImgError) throw uploadImgError;
        const { data: publicImgUrl } = supabase.storage.from('cuadernillos').getPublicUrl(rutaImgSegura);
        finalImageUrl = publicImgUrl.publicUrl;
      }

      const linkDriveFinal = form.tipo === 'curso' ? (form.link_drive || null) : null;

      if (productoAEditar) {
        const { error: updateError } = await supabase.from('productos')
          .update({ title: form.title, description: form.description, price: Number(form.price), pdf_url: finalPdfUrl, image_url: finalImageUrl, tipo: form.tipo, link_drive: linkDriveFinal })
          .eq('id', productoAEditar.id);
        if (updateError) throw updateError;
        mostrarFeedback('exito', '¡Los cambios se guardaron correctamente!');
      } else {
        const { error: insertError } = await supabase.from('productos').insert([{
          title: form.title, description: form.description, price: Number(form.price), pdf_url: finalPdfUrl, image_url: finalImageUrl, tipo: form.tipo, link_drive: linkDriveFinal, activo: true
        }]);
        if (insertError) throw insertError;
        mostrarFeedback('exito', '¡El producto se creó con éxito!');
      }

      setModalVisible(false);
      setProductoAEditar(null);
      setForm({ title: '', description: '', price: '', tipo: 'cuadernillo', link_drive: '' });
      setArchivoPdf(null);
      setArchivoImagen(null);
      await fetchProductos();

    } catch (error) {
      mostrarFeedback('error', 'Hubo un error al guardar: ' + error.message);
    } finally {
      setCargandoGuardar(false);
    }
  };

  const prepararToggleEstado = (id, estadoActual, titulo) => {
    setModalConfirmacion({ visible: true, id, estadoActual, titulo });
  };

  const ejecutarToggleEstado = async () => {
    const { id, estadoActual } = modalConfirmacion;
    const esActivo = estadoActual !== false; 
    setProcesandoEstado(true);
    try {
      const { error } = await supabase.from('productos').update({ activo: !esActivo }).eq('id', id);
      if (error) throw error;
      await fetchProductos(); 
      mostrarFeedback('exito', `El producto se ${esActivo ? 'pausó' : 'activó'} correctamente.`);
    } catch (error) {
      mostrarFeedback('error', "Error al cambiar el estado: " + error.message);
    } finally {
      setProcesandoEstado(false);
      setModalConfirmacion({ visible: false, id: null, estadoActual: null, titulo: '' });
    }
  };

  // ----------------------------------------------------------------
  // PANTALLA DE CARGA
  // ----------------------------------------------------------------
  if (verificando) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-nexo-bg">
        <p className="text-nexo-dark animate-pulse font-medium">Cargando Panel de Administración...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-nexo-bg pt-32 pb-24 relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* CABECERA Y BOTONES DE PESTAÑAS */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-nexo-dark">Dashboard General</h1>
              <p className="text-nexo-dark/70 mt-1">Administrá tus productos y visualizá tus ventas.</p>
            </div>
            {pestañaActiva === 'cuadernillos' && (
              <button onClick={abrirModalCreacion} className="bg-nexo-dark text-white px-5 py-2.5 rounded-xl hover:bg-nexo-blue transition-colors shadow-sm font-semibold flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Nuevo Producto
              </button>
            )}
          </div>

          {/* Navegación por Tabs */}
          <div className="flex gap-6 border-b border-nexo-sand/40 overflow-x-auto custom-scrollbar">
            <button 
              onClick={() => setPestañaActiva('cuadernillos')} 
              className={`pb-3 text-sm md:text-base font-bold whitespace-nowrap transition-colors border-b-2 px-1
                ${pestañaActiva === 'cuadernillos' ? 'text-nexo-blue border-nexo-blue' : 'text-nexo-dark/50 border-transparent hover:text-nexo-dark/80'}`}
            >
              📚 Catálogo de Cursos y Cuadernillos
            </button>
            <button 
              onClick={() => setPestañaActiva('ventas')} 
              className={`pb-3 text-sm md:text-base font-bold whitespace-nowrap transition-colors border-b-2 px-1
                ${pestañaActiva === 'ventas' ? 'text-nexo-blue border-nexo-blue' : 'text-nexo-dark/50 border-transparent hover:text-nexo-dark/80'}`}
            >
              💰 Registro de Ventas
            </button>
            {/* <button 
              onClick={() => setPestañaActiva('usuarios')} 
              className={`pb-3 text-sm md:text-base font-bold whitespace-nowrap transition-colors border-b-2 px-1 flex items-center gap-2
                ${pestañaActiva === 'usuarios' ? 'text-nexo-blue border-nexo-blue' : 'text-nexo-dark/50 border-transparent hover:text-nexo-dark/80'}`}
            >
              👤 Usuarios Registrados
              <span className="bg-nexo-sand/30 text-nexo-dark px-2 py-0.5 rounded-full text-xs">{usuarios.length}</span>
            </button> */}
          </div>
        </div>

        {/* ==========================================
            PESTAÑA 1: CUADERNILLOS (CATÁLOGO)
        =========================================== */}
        {pestañaActiva === 'cuadernillos' && (
          <div className="bg-white rounded-2xl shadow-sm border border-nexo-sand/30 overflow-hidden animate-fade-in-up">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-nexo-sand/20 border-b border-nexo-sand/30">
                    <th className="p-4 font-semibold text-nexo-dark text-sm uppercase tracking-wider">Título</th>
                    <th className="p-4 font-semibold text-nexo-dark text-sm uppercase tracking-wider">Tipo</th>
                    <th className="p-4 font-semibold text-nexo-dark text-sm uppercase tracking-wider">Estado</th>
                    <th className="p-4 font-semibold text-nexo-dark text-sm uppercase tracking-wider">Precio</th>
                    <th className="p-4 font-semibold text-nexo-dark text-sm uppercase tracking-wider text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map(producto => {
                    const esActivo = producto.activo !== false; 
                    return (
                      <tr key={producto.id} className={`border-b border-nexo-sand/10 transition-colors ${!esActivo ? 'bg-nexo-sand/10 opacity-70' : 'hover:bg-nexo-sand/5'}`}>
                        <td className="p-4 font-bold text-nexo-dark">
                          <div className="flex items-center gap-3">
                            {producto.image_url ? (
                              <img src={producto.image_url} alt="Portada" className="w-10 h-10 object-cover rounded-lg border border-nexo-sand/30" />
                            ) : (
                              <div className="w-10 h-10 bg-nexo-sand/30 rounded-lg flex items-center justify-center text-xs text-nexo-dark/40">Sin foto</div>
                            )}
                            <span>{producto.title}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="inline-flex items-center gap-1.5 bg-nexo-sand/20 text-nexo-dark px-3 py-1 rounded-full text-xs font-bold border border-nexo-sand/40">
                            {producto.tipo === 'curso' ? '🎥 Curso' : '📄 Cuadernillo'}
                          </span>
                        </td>
                        <td className="p-4">
                          {esActivo ? (
                            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>A la venta</span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs font-bold border border-orange-200"><span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>Pausado</span>
                          )}
                        </td>
                        <td className="p-4 text-nexo-dark/80 font-medium">${Number(producto.price).toLocaleString('es-AR')}</td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end items-center gap-4">
                            <button onClick={() => abrirModalEdicion(producto)} className="text-nexo-blue hover:text-nexo-dark transition-colors text-sm font-semibold flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg> Editar
                            </button>
                            <button onClick={() => prepararToggleEstado(producto.id, producto.activo, producto.title)} className={`text-sm font-semibold transition-colors px-3 py-1.5 rounded-lg border ${esActivo ? 'text-orange-600 border-orange-200 hover:bg-orange-50' : 'text-green-600 border-green-200 hover:bg-green-50'}`}>
                              {esActivo ? 'Pausar' : 'Activar'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {productos.length === 0 && (
                    <tr><td colSpan="5" className="p-12 text-center text-nexo-dark/50">No hay productos cargados todavía.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==========================================
            PESTAÑA 2: VENTAS (Registro)
        =========================================== */}
        {pestañaActiva === 'ventas' && (
          <div className="bg-white rounded-2xl shadow-sm border border-nexo-sand/30 overflow-hidden animate-fade-in-up">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-nexo-sand/20 border-b border-nexo-sand/30">
                    <th className="p-4 font-semibold text-nexo-dark text-sm uppercase tracking-wider">Fecha</th>
                    <th className="p-4 font-semibold text-nexo-dark text-sm uppercase tracking-wider">Producto Vendido</th>
                    <th className="p-4 font-semibold text-nexo-dark text-sm uppercase tracking-wider">Compradora</th>
                    <th className="p-4 font-semibold text-nexo-dark text-sm uppercase tracking-wider">Ingreso</th>
                    <th className="p-4 font-semibold text-nexo-dark text-sm uppercase tracking-wider">Estado de Pago</th>
                    <th className="p-4 font-semibold text-nexo-dark text-sm uppercase tracking-wider">Acceso al Curso</th>
                  </tr>
                </thead>
                <tbody>
                  {ventas.map(venta => {
                    const esCurso = venta.productos?.tipo === 'curso';
                    return (
                      <tr key={venta.id} className="border-b border-nexo-sand/10 hover:bg-nexo-sand/5 transition-colors">
                        <td className="p-4 font-medium text-nexo-dark/70 text-sm">
                          {new Date(venta.created_at).toLocaleDateString('es-AR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="p-4 font-bold text-nexo-dark">{venta.productos?.title || 'Producto Eliminado'}</td>
                        <td className="p-4 text-nexo-dark/80 text-sm">{venta.email_comprador || '---'}</td>
                        <td className="p-4 font-bold text-green-700">
                          ${venta.productos?.price ? Number(venta.productos.price).toLocaleString('es-AR') : '---'}
                        </td>
                        <td className="p-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border
                            ${venta.estado_pago === 'completado' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                            {venta.estado_pago === 'completado' ? 'Aprobado' : 'Pendiente'}
                          </span>
                        </td>
                        <td className="p-4">
                          {!esCurso ? (
                            <span className="text-xs text-nexo-dark/40">No aplica</span>
                          ) : venta.acceso_entregado ? (
                            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-200">✅ Entregado</span>
                          ) : (
                            <button onClick={() => marcarAccesoEntregado(venta.id)} className="text-xs font-semibold text-white bg-nexo-dark hover:bg-nexo-blue px-3 py-1.5 rounded-lg transition-colors">
                              Marcar como entregado
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {ventas.length === 0 && (
                    <tr><td colSpan="6" className="p-12 text-center text-nexo-dark/50">Aún no hay registros de ventas. ¡Pronto llegará la primera! 🚀</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* 🪟 POP-UP CONFIRMACIÓN PAUSAR/ACTIVAR */}
      {modalConfirmacion.visible && (
        <div className="fixed inset-0 bg-nexo-dark/60 backdrop-blur-sm z-[60] flex justify-center items-center p-4 animate-fade-in-up">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-sm shadow-2xl relative text-center">
            <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${modalConfirmacion.estadoActual !== false ? 'bg-orange-100 text-orange-600' : 'bg-green-100 text-green-600'}`}>
              {modalConfirmacion.estadoActual !== false ? (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              ) : (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              )}
            </div>
            <h3 className="text-xl font-bold text-nexo-dark mb-2">{modalConfirmacion.estadoActual !== false ? '¿Pausar producto?' : '¿Activar producto?'}</h3>
            <p className="text-sm text-nexo-dark/70 mb-6">
              Estás a punto de {modalConfirmacion.estadoActual !== false ? 'pausar' : 'activar'} <strong>"{modalConfirmacion.titulo}"</strong>.
              {modalConfirmacion.estadoActual !== false ? ' Dejará de verse en la tienda pública.' : ' Volverá a estar disponible para la venta.'}
            </p>
            <div className="flex gap-3 justify-center">
              <button onClick={() => setModalConfirmacion({ visible: false, id: null, estadoActual: null, titulo: '' })} disabled={procesandoEstado} className="px-5 py-2.5 rounded-xl font-semibold text-nexo-dark bg-nexo-sand/20 hover:bg-nexo-sand/40 transition-colors disabled:opacity-50">Cancelar</button>
              <button onClick={ejecutarToggleEstado} disabled={procesandoEstado} className={`px-5 py-2.5 rounded-xl font-semibold text-white transition-colors disabled:opacity-50 shadow-sm flex items-center gap-2 ${modalConfirmacion.estadoActual !== false ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-600 hover:bg-green-700'}`}>
                {procesandoEstado ? 'Procesando...' : (modalConfirmacion.estadoActual !== false ? 'Sí, pausar' : 'Sí, activar')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🪟 MODAL DE CREACIÓN / EDICIÓN */}
      {modalVisible && (
        <div className="fixed inset-0 bg-nexo-dark/60 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fade-in-up">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
            
            <button onClick={() => setModalVisible(false)} className="absolute top-6 right-6 text-nexo-dark/40 hover:text-nexo-dark transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            
            <h2 className="text-2xl font-bold text-nexo-dark mb-6">{productoAEditar ? 'Editar Producto' : 'Agregar Producto'}</h2>

            <form onSubmit={handleGuardar} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-nexo-dark mb-1">Tipo*</label>
                <div className="flex gap-3">
                  <button type="button" onClick={() => setForm({...form, tipo: 'cuadernillo'})} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${form.tipo === 'cuadernillo' ? 'bg-nexo-dark text-white border-nexo-dark' : 'bg-white text-nexo-dark border-nexo-sand/50 hover:bg-nexo-sand/10'}`}>
                    📄 Cuadernillo
                  </button>
                  <button type="button" onClick={() => setForm({...form, tipo: 'curso'})} className={`flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${form.tipo === 'curso' ? 'bg-nexo-dark text-white border-nexo-dark' : 'bg-white text-nexo-dark border-nexo-sand/50 hover:bg-nexo-sand/10'}`}>
                    🎥 Curso (PDF + Video)
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-nexo-dark mb-1">Título*</label>
                <input type="text" value={form.title} onChange={(e) => setForm({...form, title: e.target.value})} className="w-full rounded-xl border border-nexo-sand/50 px-4 py-2.5 focus:ring-2 focus:ring-nexo-blue outline-none transition-all text-sm"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-nexo-dark mb-1">Descripción*</label>
                <textarea value={form.description} onChange={(e) => setForm({...form, description: e.target.value})} rows="3" className="w-full rounded-xl border border-nexo-sand/50 px-4 py-2.5 focus:ring-2 focus:ring-nexo-blue outline-none transition-all text-sm resize-none"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-nexo-dark mb-1">Precio (en pesos ARS)</label>
                <input type="number" value={form.price} onChange={(e) => setForm({...form, price: e.target.value})} className="w-full rounded-xl border border-nexo-sand/50 px-4 py-2.5 focus:ring-2 focus:ring-nexo-blue outline-none transition-all text-sm"/>
              </div>
              {form.tipo === 'curso' && (
                <div>
                  <label className="block text-sm font-medium text-nexo-dark mb-1">Link de Drive del video (referencia interna)</label>
                  <input type="text" value={form.link_drive} onChange={(e) => setForm({...form, link_drive: e.target.value})} placeholder="https://drive.google.com/..." className="w-full rounded-xl border border-nexo-sand/50 px-4 py-2.5 focus:ring-2 focus:ring-nexo-blue outline-none transition-all text-sm"/>
                  <p className="text-xs text-nexo-dark/50 mt-1">Solo lo ves vos acá, para tenerlo a mano cuando compartas el acceso manualmente.</p>
                </div>
              )}

              <div className="bg-nexo-sand/10 p-4 rounded-xl border border-nexo-sand/30 space-y-4">
                {productoAEditar && (
                  <p className="text-xs text-nexo-dark/60 font-medium mb-2 pb-2 border-b border-nexo-sand/30">💡 Si no querés modificar el PDF o la foto actual, dejá estos campos vacíos.</p>
                )}
                <div>
                  <label className="block text-sm font-medium text-nexo-dark mb-2">Archivo PDF {!productoAEditar && '(Obligatorio)'}</label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-nexo-dark hover:bg-nexo-blue text-white text-xs font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm">
                      Seleccionar PDF
                      <input type="file" accept=".pdf" onChange={(e) => setArchivoPdf(e.target.files[0])} className="hidden" />
                    </label>
                    <span className="text-xs text-nexo-dark/60 truncate max-w-[200px]">{archivoPdf ? archivoPdf.name : 'Ningún archivo nuevo'}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-nexo-sand/30">
                  <label className="block text-sm font-medium text-nexo-dark mb-2">Foto de Portada (Opcional)</label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-white border border-nexo-sand/50 hover:bg-nexo-sand/20 text-nexo-dark text-xs font-semibold py-2 px-4 rounded-lg transition-colors shadow-sm">
                      Seleccionar Foto
                      <input type="file" accept="image/*" onChange={(e) => setArchivoImagen(e.target.files[0])} className="hidden" />
                    </label>
                    <span className="text-xs text-nexo-dark/60 truncate max-w-[200px]">{archivoImagen ? archivoImagen.name : 'Ninguna foto nueva'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" disabled={cargandoGuardar} className="w-full bg-nexo-dark text-white font-semibold rounded-xl py-3 hover:bg-nexo-blue transition-all disabled:opacity-50 flex justify-center items-center gap-2">
                  {cargandoGuardar ? (
                    <><svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>{productoAEditar ? 'Guardando cambios...' : 'Guardando y subiendo...'}</>
                  ) : (
                    productoAEditar ? 'Guardar Cambios' : 'Guardar Producto'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🟢🔴 SISTEMA DE FEEDBACK GLOBALES */}
      {feedback.visible && (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[70] w-[90%] max-w-sm animate-fade-in-up">
          <div className={`p-4 rounded-2xl shadow-xl flex items-center gap-3 border ${feedback.tipo === 'error' ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${feedback.tipo === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              {feedback.tipo === 'error' ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              )}
            </div>
            <p className={`text-sm font-semibold ${feedback.tipo === 'error' ? 'text-red-800' : 'text-green-800'}`}>{feedback.mensaje}</p>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #d1d5db; border-radius: 20px; }
      `}</style>
    </div>
  );
};