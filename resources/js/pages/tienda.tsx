/*
 * Explicacion simple del archivo:
 * Este archivo forma parte de resources/js/pages/tienda.tsx y ayuda a que la app funcione de forma ordenada.
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tienda',
        href: tienda(),
    },
];

export default function Tienda() {
    const [open, setOpen] = React.useState(true);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="RPG-Tasker | Bazar del Héroe">
                <link
                    rel="stylesheet"
                    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
                />
            </Head>

            {/* Modal PROXIMAMENTE */}
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="bg-white">
                    <DialogHeader className="text-center">
                        <DialogTitle style={{ color: "black" }} className="text-center">PRÓXIMAMENTE</DialogTitle>
                        <DialogDescription className="text-center">
                            Esta sección estará disponible en una próxima actualización.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose asChild>
                            <button
                                type="button"
                                className="mt-2 px-4 py-2 rounded bg-primary text-white font-semibold hover:bg-primary/90"
                                onClick={() => setOpen(false)}
                            >
                                Cerrar
                            </button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <div className="min-h-screen bg-[#f8fafc] text-slate-900">
                <style>{`
                    :root {
                        --primary: #6366f1;
                        --secondary: #a855f7;
                        --dark: #1e1e2e;
                        --light: #f8fafc;
                        --gold: #f59e0b;
                        --danger: #ef4444;
                    }

                    main {
                        overflow-y: auto;
                    }

                    .shop-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        background: white;
                        padding: 20px 30px;
                        border-radius: 15px;
                        margin-bottom: 30px;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
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

                    .item-card {
                        background: white;
                        border-radius: 12px;
                        padding: 20px;
                        text-align: center;
                        transition: transform 0.2s, box-shadow 0.2s;
                        border: 1px solid #e2e8f0;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                    }

                    .item-card:hover {
                        transform: translateY(-5px);
                        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
                    }

                    .item-icon {
                        font-size: 3rem;
                        margin-bottom: 15px;
                        color: #64748b;
                    }

                    .item-name {
                        font-weight: bold;
                        margin-bottom: 5px;
                        display: block;
                    }

                    .item-desc {
                        font-size: 0.85rem;
                        color: #64748b;
                        margin-bottom: 15px;
                    }

                    .item-price {
                        font-weight: bold;
                        color: var(--gold);
                        margin-bottom: 15px;
                        font-size: 1.1rem;
                    }

                    .btn-buy {
                        background: var(--primary);
                        color: white;
                        border: none;
                        padding: 10px;
                        border-radius: 8px;
                        cursor: pointer;
                        font-weight: bold;
                        transition: background 0.2s;
                    }

                    .btn-buy:disabled {
                        background: #cbd5e1;
                        cursor: not-allowed;
                    }

                    .btn-buy:hover:not(:disabled) {
                        background: var(--secondary);
                    }

                    .level-req {
                        font-size: 0.7rem;
                        background: #f1f5f9;
                        padding: 2px 8px;
                        border-radius: 4px;
                        color: #475569;
                    }

                    .level-req.locked {
                        color: var(--danger);
                    }

                    .item-card.locked {
                        opacity: 0.7;
                    }
                `}</style>

                <main>
                    <header className="shop-header">
                        <div>
                            <h2 style={{ margin: 0 }}>Bazar del Gremio</h2>
                            <p style={{ margin: '5px 0 0', color: '#64748b' }}>
                                Intercambia tu esfuerzo por recompensas.
                            </p>
                        </div>
                        <div className="currency-display">
                            <i className="fa-solid fa-coins" />
                            <span>1,250 G</span>
                        </div>
                    </header>

                    <div className="shop-grid">
                        <article className="item-card">
                            <div>
                                <span className="level-req">Nivel 1</span>
                                <div className="item-icon">
                                    <i className="fa-solid fa-mug-hot" />
                                </div>
                                <span className="item-name">Café de Especialidad</span>
                                <p className="item-desc">Un premio real por tu productividad matutina.</p>
                            </div>
                            <div>
                                <div className="item-price">100 G</div>
                                <button className="btn-buy" type="button">
                                    Comprar
                                </button>
                            </div>
                        </article>

                        <article className="item-card">
                            <div>
                                <span className="level-req">Nivel 5</span>
                                <div className="item-icon">
                                    <i className="fa-solid fa-shield-halved" />
                                </div>
                                <span className="item-name">Escudo de Enfoque</span>
                                <p className="item-desc">+5 VIT. Reduce la pérdida de XP al fallar tareas.</p>
                            </div>
                            <div>
                                <div className="item-price">450 G</div>
                                <button className="btn-buy" type="button">
                                    Comprar
                                </button>
                            </div>
                        </article>

                        <article className="item-card">
                            <div>
                                <span className="level-req">Nivel 10</span>
                                <div className="item-icon">
                                    <i className="fa-solid fa-gamepad" />
                                </div>
                                <span className="item-name">Sesión de Gaming</span>
                                <p className="item-desc">Canjea 1 hora de juego libre sin culpa.</p>
                            </div>
                            <div>
                                <div className="item-price">300 G</div>
                                <button className="btn-buy" type="button">
                                    Comprar
                                </button>
                            </div>
                        </article>

                        <article className="item-card locked">
                            <div>
                                <span className="level-req locked">Req. Nivel 15</span>
                                <div className="item-icon">
                                    <i className="fa-solid fa-wand-magic-sparkles" />
                                </div>
                                <span className="item-name">Capa de Invisibilidad</span>
                                <p className="item-desc">Cancela una tarea pendiente sin penalización.</p>
                            </div>
                            <div>
                                <div className="item-price">1,000 G</div>
                                <button className="btn-buy" type="button" disabled>
                                    Bloqueado
                                </button>
                            </div>
                        </article>
                    </div>
                </main>
            </div>
        </AppLayout>
    );
}
