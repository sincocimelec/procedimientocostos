document.addEventListener('DOMContentLoaded', function () {
    const flujoVisual = document.getElementById('flujo-proceso-visual');
    const detallesEtapaSeccion = document.getElementById('detalles-etapa');
    const tituloEtapaActual = document.getElementById('titulo-etapa-actual');
    const listaSubprocesosDiv = document.getElementById('lista-subprocesos');
    const detalleSubProcesoContenido = document.getElementById('detalle-sub-proceso-contenido');
    const tituloSubprocesoActual = document.getElementById('titulo-subproceso-actual');
    const subprocesoEntradas = document.getElementById('subproceso-entradas');
    const subprocesoPasos = document.getElementById('subproceso-pasos');
    const subprocesoIntervinientes = document.getElementById('subproceso-intervinientes');
    const subprocesoSalidas = document.getElementById('subproceso-salidas');
    const btnVolverAlFlujo = document.getElementById('volver-al-flujo');
    const btnVolverAEtapa = document.getElementById('volver-a-etapa');

    // Datos de ejemplo para los subprocesos (aquí iría tu contenido real)
    const datosEtapas = {
        'B_PLANIFICACION': {
            nombre: '1. Planificación y Elaboración del Presupuesto',
            subprocesos: {
                'solicitud-bd': {
                    nombre: 'Solicitud de base de datos en SINCO ERP',
                    entradas: ['RUT nueva empresa', 'Documento acuerdo consorcial', 'Cédula RL', 'Cert. composición accionaria', 'Logo (de Comunicaciones)'],
                    pasos: [
                        'Recopilar documentos mencionados en Entradas.',
                        'Diligenciar formatos SINCO: "IMF30IMF30_Formato_unico_..." y "Formato de conocimiento de contrapartes".',
                        'Obtener autorización de base de datos.',
                        'Crear carpeta con nombre de nueva empresa en SINCO/IMPLEMENTACIÓN EMPRESAS.',
                        'Enviar solicitud de creación a SINCO ERP por medio de un caso CAPTA.'
                    ],
                    intervinientes: 'Área de Licitaciones, Dirección de Presupuestos y Costos, SINCO SOFT.',
                    salidas: 'Base de datos creada en SINCO.'
                },
                'config-inicial': {
                    nombre: 'Configuración inicial de proyecto en SINCO',
                    entradas: ['Base de datos creada'],
                    pasos: [
                        'Crear usuarios y perfiles, asignar a proyecto y sucursal.',
                        'Establecer montos de aprobación por usuario.',
                        'Configurar sucursal y proyecto (creación y asignación).',
                        'Generar consecutivos iniciales para numeración de contratos (recomendado conservar numeración de proyecto y sucursal).',
                        'Configurar semanas de pago según día de la semana (una vez al año).',
                        'Realizar plantillas para contratos (transporte, servicios profesionales, OC, mano de obra) según formatos de Calidad.'
                    ],
                    intervinientes: 'Dirección de Presupuestos y Costos, SINCO SOFT.',
                    salidas: 'Base de datos en SINCO configurada para el proyecto.'
                },
                 'descomposicion-costos': {
                    nombre: 'Descomposición del proyecto y costos preliminares',
                    entradas: ['Propuesta económica', 'Datos históricos de proyectos anteriores', 'Bases de datos de APU de referencia'],
                    pasos: [
                        'Analizar la propuesta económica y plantear actividades.',
                        'Estimar costos directos (por capítulos y actividades) e indirectos (capítulo de administración).',
                        'Consultar APU\'s en bases de datos de referencia y proyectos anteriores.',
                        'Crear plantilla de presupuesto en Excel incluyendo: desglose costos directos por capítulos, desglose capítulos por actividades, desglose actividades por APU\'S, capítulo específico para administración (nómina, arriendos, impuestos, pólizas, gastos ambientales, SST, tránsito).',
                        'Solicitar al área de compras cotizaciones de al menos el 80% del valor de insumos de APU\'s (priorizar concretos, agregados, asfaltos, transporte de materiales).'
                    ],
                    intervinientes: 'Dirección de Presupuestos y Costos, Área de compras.',
                    salidas: 'Estructura de desglose de trabajo (EDT) presupuestada, organizada por Costos Directos e Indirectos, capítulos y actividades.'
                }
                // Añade más subprocesos aquí
            }
        },
        'C_EJECUCION': {
            nombre: '2. Ejecución del Presupuesto',
            subprocesos: {
                'adquisicion-recursos': { nombre: 'Adquisición de recursos', entradas: ['Presupuesto aprobado'], pasos: ['Registrar pedidos en SINCO.', 'Director de proyecto aprueba pedidos.', 'Área de compras gestiona adquisición.'], intervinientes: 'Equipo de proyecto, Compras', salidas: 'Recursos adquiridos.'}
            }
        },
        'D_SEGUIMIENTO': {
            nombre: '3. Verificación y Seguimiento Presupuestal',
             subprocesos: {
                'auditorias-periodicas': { nombre: 'Auditorías Periódicas', entradas: ['Registros del proyecto'], pasos: ['Realizar auditorías cada seis meses.'], intervinientes: 'Dirección de Presupuestos y Costos', salidas: 'Informe de auditoría.'}
            }
        },
        'E_CIERRE': {
            nombre: '4. Cierre y Evaluación del Presupuesto',
            subprocesos: {}
        },
        // Elementos de Soporte como etapas separadas para simplificar
        'G_SINCO_CFG': {
            nombre: 'Configuración Inicial SINCO',
            subprocesos: {
                'detalle-config-sinco': {
                    nombre: 'Detalle de Configuración Inicial en SINCO',
                    entradas: ['Solicitud de elaboración de presupuesto', 'Datos de la nueva empresa/consorcio'],
                    pasos: [
                        'Ver pasos detallados en "Configuración inicial de proyecto en SINCO" dentro de la etapa de Planificación.'
                    ],
                    intervinientes: 'Dirección de Presupuestos y Costos, SINCO SOFT.',
                    salidas: 'Base de datos en SINCO configurada.'
                }
            }
        },
        'H_AUDITORIAS': {
            nombre: 'Auditorías Periódicas',
             subprocesos: {
                'detalle-auditorias': {
                    nombre: 'Proceso de Auditorías',
                    entradas: ['Datos del proyecto activo'],
                    pasos: [
                        'Auditar Requisiciones (Pedidos).', 'Auditar Contratos.', 'Auditar Caja Menor.', 'Auditar Compras / Almacén.', 'Auditar Radicación de Facturas.', 'Auditar Control de Presupuesto.', 'Auditar Ejecución (Actas de avance).'
                    ],
                    intervinientes: 'Dirección de Presupuestos y Costos, Equipo del proyecto.',
                    salidas: 'Informe por proyecto con novedades e inconformidades.'
                }
            }
        },
         'I_INDICADORES': {
            nombre: 'Análisis de Indicadores',
            subprocesos: {
                'detalle-indicadores': {
                    nombre: 'Cálculo y Seguimiento de Indicadores',
                    entradas: ['Datos de ejecución presupuestal', 'Datos de costos'],
                    pasos: [
                        'Calcular "Seguimiento a Actividades sin cobro".',
                        'Calcular "Control de costos administrativos por centro de costo".',
                        'Calcular "Valor recuperado de actividades por cobrar".'
                    ],
                    intervinientes: 'Dirección de Presupuestos y Costos.',
                    salidas: 'Reportes de indicadores para toma de decisiones.'
                }
            }
        }
    };

    // Hacer nodos del diagrama clickables
    // Esperar a que Mermaid renderice el SVG
    const observer = new MutationObserver((mutationsList, obs) => {
        for(const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                const svgElement = flujoVisual.querySelector("svg");
                if (svgElement) {
                    setupDiagramClicks();
                    obs.disconnect(); // Dejar de observar una vez que el SVG está
                    return;
                }
            }
        }
    });
    observer.observe(flujoVisual.querySelector('.mermaid'), { childList: true, subtree: true });


    function setupDiagramClicks() {
        const nodosDiagrama = flujoVisual.querySelectorAll('.mermaid svg .node'); // Selector más general para nodos
        nodosDiagrama.forEach(nodo => {
            const idNodo = nodo.id;
            if (datosEtapas[idNodo]) {
                nodo.classList.add('clickable'); // Clase para feedback visual
                nodo.addEventListener('click', () => mostrarEtapa(idNodo));
            }
        });
    }


    function mostrarEtapa(idEtapa) {
        const etapa = datosEtapas[idEtapa];
        if (!etapa) return;

        flujoVisual.classList.add('hidden');
        detallesEtapaSeccion.classList.remove('hidden');
        detalleSubProcesoContenido.classList.add('hidden'); // Ocultar detalles de subproceso anterior

        tituloEtapaActual.textContent = etapa.nombre;
        listaSubprocesosDiv.innerHTML = ''; // Limpiar botones anteriores

        if (Object.keys(etapa.subprocesos).length > 0) {
            for (const idSubproceso in etapa.subprocesos) {
                const subproceso = etapa.subprocesos[idSubproceso];
                const boton = document.createElement('button');
                boton.textContent = subproceso.nombre;
                boton.addEventListener('click', () => mostrarDetalleSubproceso(etapa.subprocesos[idSubproceso]));
                listaSubprocesosDiv.appendChild(boton);
            }
            listaSubprocesosDiv.classList.remove('hidden');
        } else {
             listaSubprocesosDiv.innerHTML = '<p>No hay subprocesos definidos para esta etapa.</p>';
             listaSubprocesosDiv.classList.remove('hidden');
        }
        detallesEtapaSeccion.scrollIntoView({ behavior: 'smooth' });
    }

    function mostrarDetalleSubproceso(subproceso) {
        listaSubprocesosDiv.classList.add('hidden'); // Ocultar lista de botones de subprocesos
        detalleSubProcesoContenido.classList.remove('hidden');

        tituloSubprocesoActual.textContent = subproceso.nombre;

        subprocesoEntradas.innerHTML = '';
        (subproceso.entradas || []).forEach(entrada => {
            const li = document.createElement('li');
            li.textContent = entrada;
            subprocesoEntradas.appendChild(li);
        });

        subprocesoPasos.innerHTML = '';
        (subproceso.pasos || []).forEach(paso => {
            const li = document.createElement('li');
            li.textContent = paso;
            subprocesoPasos.appendChild(li);
        });

        subprocesoIntervinientes.textContent = subproceso.intervinientes || 'N/A';
        subprocesoSalidas.textContent = subproceso.salidas || 'N/A';

        detalleSubProcesoContenido.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    btnVolverAlFlujo.addEventListener('click', () => {
        detallesEtapaSeccion.classList.add('hidden');
        flujoVisual.classList.remove('hidden');
        flujoVisual.scrollIntoView({ behavior: 'smooth' });
    });

    btnVolverAEtapa.addEventListener('click', () => {
        detalleSubProcesoContenido.classList.add('hidden');
        listaSubprocesosDiv.classList.remove('hidden');
    });

    // Manejo de enlaces de navegación del header
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            // Ocultar todas las secciones principales y luego mostrar la seleccionada
            flujoVisual.classList.add('hidden');
            detallesEtapaSeccion.classList.add('hidden');
            document.querySelectorAll('.info-seccion').forEach(sec => sec.classList.add('hidden'));

            if (targetId === 'flujo-proceso-visual') {
                flujoVisual.classList.remove('hidden');
            } else if (targetElement) {
                targetElement.classList.remove('hidden');
            }

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

});