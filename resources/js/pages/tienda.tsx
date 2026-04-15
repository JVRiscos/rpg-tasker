/**
 * Archivo: resources/js/pages/tienda.tsx
 * Propósito: El "Bazar del Gremio". Interfaz para canjear oro (G) por recompensas
 * tanto cosméticas como beneficios para la productividad real.
 */

import { Head } from '@inertiajs/react';
import * as React from 'react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
    DialogFooter,
} from '@/components/ui/dialog';
import AppLayout from '@/layouts/app-layout';
import { tienda } from '@/routes';
import type { BreadcrumbItem } from '@/types';

// Navegación superior
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tienda',
        href: tienda(),
    },
];

export default function Tienda() {
    // Estado para controlar el modal informativo de "Próximamente"
    const [open, setOpen] = React.useState(true);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="RPG-Tasker | Bazar del Héroe">
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                />
            </Head>

            {/* MODAL INFORMATIVO: Se muestra al cargar para avisar que es una beta */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="bg-white">
                    <DialogHeader className="text-center">
                        <DialogTitle style={{ color: "black" }} className="text-center">PRÓXIMAMENTE</DialogTitle>
                        <DialogDescription className="text-center">
                            Esta sección estará disponible en una próxima actualización. 
                            ¡Sigue completando tareas para acumular oro!
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <button
                                type="button"
                                className="mt-2 px-4 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90"
                                onClick={() => setOpen(false)}
                            >
                                Entendido
                            </button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="min-h-screen bg-[#f8fafc] text-slate-900">
                <style>{`
                    :root {
                        --gold: #f59e0b;
                        --primary: #6366f1;
                    }

                    .shop-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background: white;
                        padding: 20px 30px;
                        border-radius: 15px;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                        margin-bottom: 30px;
                    }

                    .currency-display {
                        font-size: 1.5rem;
                        font-weight: bold;
                        color: var(--gold);
                        display: flex;
                        align-items: center;
                        gap: 10px;
                    }

                    .shop-grid {
                        display: grid;
                        grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
                        gap: 25px;
                    }

                    /* Efecto de elevación en las cartas de items */
                    .item-card {
                        background: white;
                        border-radius: 12px;
                        padding: 20px;
                        transition: all 0.2s;
                        border: 1px solid #e2e8f0;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }

                    .item-card:hover:not(.locked) {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
                    }

                    /* Estilo para items bloqueados por nivel */
                    .item-card.locked {
                        opacity: 0.6;
                        filter: grayscale(1);
                        cursor: not-allowed;
                    }
                `}</style>

                <main>
                    {/* ENCABEZADO: Saldo de Oro */}
                    <header className="shop-header">
                        <div>
                            <h2 style={{ margin: 0 }}>Bazar del Gremio</h2>
                            <p style={{ margin: '5px 0 0', color: '#64748b' }}>
                                Intercambia tu esfuerzo por recompensas.
                            </p>
                        </div>
                        <div className="currency-display">
                            <i className="fa-solid fa-coins" />
                            <span>1,250 G</span> {/* Saldo harcoded para la demo */}
                        </div>
                    </header>

                    {/* GRILLA DE PRODUCTOS */}
                    <div className="shop-grid">
                        
                        {/* ITEM 1: Recompensa del mundo real */}
                        <article className="item-card">
                            <div>
                                <span className="level-req">Nivel 1</span>
                                <div className="item-icon"><i className="fa-solid fa-mug-hot" /></div>
                                <span className="item-name">Café de Especialidad</span>
                                <p className="item-desc">Un premio real por tu productividad matutina.</p>
                            </div>
                            <div>
                                <div className="item-price">100 G</div>
                                <button className="btn-buy" type="button">Comprar</button>
                            </div>
                        </article>

                        {/* ITEM 2: Mejora de estadísticas (RPG) */}
                        <article className="item-card">
                            <div>
                                <span className="level-req">Nivel 5</span>
                                <div className="item-icon"><i className="fa-solid fa-shield-halved" /></div>
                                <span className="item-name">Escudo de Enfoque</span>
                                <p className="item-desc">+5 VIT. Reduce penalizaciones por fallo.</p>
                            </div>
                            <div>
                                <div className="item-price">450 G</div>
                                <button className="btn-buy" type="button">Comprar</button>
                            </div>
                        </article>

                        {/* ITEM 3: Tiempo libre */}
                        <article className="item-card">
                            <div>
                                <span className="level-req">Nivel 10</span>
                                <div className="item-icon"><i className="fa-solid fa-gamepad" /></div>
                                <span className="item-name">Sesión de Gaming</span>
                                <p className="item-desc">Canjea 1 hora de juego libre sin culpa.</p>
                            </div>
                            <div>
                                <div className="item-price">300 G</div>
                                <button className="btn-buy" type="button">Comprar</button>
                            </div>
                        </article>

                        {/* ITEM 4: Item bloqueado (Nivel insuficiente) */}
                        <article className="item-card locked">
                            <div>
                                <span className="level-req locked">Req. Nivel 15</span>
                                <div className="item-icon"><i className="fa-solid fa-wand-magic-sparkles" /></div>
                                <span className="item-name">Capa de Invisibilidad</span>
                                <p className="item-desc">Cancela una tarea pendiente sin penalización.</p>
                            </div>
                            <div>
                                <div className="item-price">1,000 G</div>
                                <button className="btn-buy" type="button" disabled>Bloqueado</button>
                            </div>
                        </article>

                    </div>
                </main>
            </div>
        </AppLayout>
    );
}