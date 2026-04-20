import { Head, Link, usePage } from '@inertiajs/react';
import { bitacora, login, register } from '@/routes';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;

    return (
        <>
            <Head title="Inicio">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-[#eef4ff] text-[#1b1b18] dark:bg-[#050812] dark:text-[#f8f6f1]">
                <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-8 lg:px-8">
                    <header className="flex items-center justify-between gap-6 pb-8">
                        <div className="text-lg font-semibold tracking-tight">
                            RPG Tasker
                        </div>

                        <nav className="flex flex-wrap items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={bitacora()}
                                    className="inline-flex rounded-full border border-[#1b1b18] bg-white px-5 py-2 text-sm font-semibold text-[#1b1b18] shadow-sm transition hover:bg-[#f0f0ee] dark:border-[#efebe5] dark:bg-[#191919] dark:text-[#f8f6f1] dark:hover:bg-[#2b2b2b]"
                                >
                                    Bitácora
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="inline-flex rounded-full border border-transparent bg-transparent px-5 py-2 text-sm font-semibold text-[#1b1b18] transition hover:border-[#1b1b18] hover:bg-[#f0f0ee] dark:text-[#f8f6f1] dark:hover:border-[#efebe5] dark:hover:bg-[#191919]"
                                    >
                                        Iniciar sesión
                                    </Link>
                                    {canRegister && (
                                        <Link
                                            href={register()}
                                            className="inline-flex rounded-full border border-[#1b1b18] bg-white px-5 py-2 text-sm font-semibold text-[#1b1b18] transition hover:bg-[#f0f0ee] dark:border-[#efebe5] dark:bg-[#191919] dark:text-[#f8f6f1] dark:hover:bg-[#2b2b2b]"
                                        >
                                            Registro
                                        </Link>
                                    )}
                                </>
                            )}
                        </nav>
                    </header>

                    <main className="grid flex-1 items-center gap-10 lg:grid-cols-[1.15fr_0.85fr]">
                        <section className="space-y-8">
                            <div className="overflow-hidden rounded-[2rem] border border-[#e7e3dd] bg-white p-8 shadow-[0_24px_80px_rgba(0,0,0,0.08)] dark:border-[#2d2b28] dark:bg-[#111111] dark:shadow-[0_32px_120px_rgba(0,0,0,0.35)]">
                                <span className="inline-flex rounded-full bg-[#e7f0ff] px-4 py-2 text-sm font-semibold text-[#1746c8] dark:bg-[#102b5d] dark:text-[#c8d8ff]">
                                    Gamificación para tus hábitos
                                </span>

                                <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                                    Convierte tus tareas en misiones y sube de nivel con cada logro.
                                </h1>

                                <p className="mt-6 max-w-2xl text-base leading-8 text-[#5f5b52] dark:text-[#c4c0b7]">
                                    Organiza tu día con hábitos, objetivos y tareas épicas.
                                    Gana experiencia, desbloquea recompensas y mantén tu progreso siempre visible.
                                </p>

                                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                                    <Link
                                        href={register()}
                                        className="inline-flex items-center justify-center rounded-full bg-[#0d3d9b] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-[#1751d9]/15 transition hover:bg-[#0a3ae0]"
                                    >
                                        Empieza gratis
                                    </Link>
                                    <Link
                                        href={login()}
                                        className="inline-flex items-center justify-center rounded-full border border-[#1b1b18] bg-transparent px-6 py-3 text-sm font-semibold text-[#1b1b18] transition hover:bg-[#1b1b18] hover:text-white dark:border-[#efebe5] dark:text-[#efebe5] dark:hover:bg-[#efebe5] dark:hover:text-[#1b1b18]"
                                    >
                                        Ya tengo cuenta
                                    </Link>
                                </div>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <div className="rounded-[1.75rem] border border-[#e7e3dd] bg-white p-6 text-sm shadow-sm dark:border-[#2d2b28] dark:bg-[#151515]">
                                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6e675c] dark:text-[#9b958b]">Misiones</p>
                                    <p className="mt-4 text-3xl font-semibold">Tú eliges como avanzar</p>
                                    <p className="mt-3 text-sm leading-6 text-[#5f5b52] dark:text-[#bfb9af]">
                                        Selecciona la frecuencia de tus hábitos y completa misiones únicas, diarias, semanales o mensuales para ganar experiencia.
                                    </p>
                                </div>
                                <div className="rounded-[1.75rem] border border-[#e7e3dd] bg-white p-6 text-sm shadow-sm dark:border-[#2d2b28] dark:bg-[#151515]">
                                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6e675c] dark:text-[#9b958b]">Recompensas</p>
                                    <p className="mt-4 text-3xl font-semibold">Tu personaje sube de nivel contigo</p>
                                    <p className="mt-3 text-sm leading-6 text-[#5f5b52] dark:text-[#bfb9af]">
                                        Si completas tus tareas, tu personaje será más poderoso. Si no, perderá progreso. ¡Mantén tu personaje fuerte completando tus misiones!
                                    </p>
                                </div>
                            </div>
                        </section>

                        <section className="relative p-8">
                            <div className="pointer-events-none absolute -right-16 top-6 h-56 w-56 rounded-full bg-[#cfe0ff] opacity-70 blur-3xl dark:bg-[#2a4ea0]" />
                            <div className="pointer-events-none absolute -left-8 top-20 h-32 w-32 rounded-full bg-[#e4efff] opacity-80 blur-3xl dark:bg-[#132c65]" />

                            <div className="relative space-y-6">
                                <div className="rounded-[1.75rem] border border-[#eeded7] bg-white p-6 shadow-sm dark:border-[#3a2f28] dark:bg-[#161616]">
                                    <div className="flex items-center justify-between gap-4">
                                        <div>
                                            <p className="text-sm font-semibold text-[#5f5b52] dark:text-[#c4c0b7]">
                                                Tienda
                                            </p>
                                            <p className="mt-3 text-xl font-semibold text-[#1b1b18] dark:text-[#f8f6f1]">
                                                Compra recompensas con tu progreso y personaliza tu experiencia de juego.
                                            </p>
                                        </div>
                                        <span className="rounded-full bg-[#d8e7ff] px-3 py-1 text-xs font-semibold text-[#1746c8] dark:bg-[#1c3478] dark:text-[#c8d8ff]">
                                            Próximamente
                                        </span>
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div className="rounded-[1.75rem] border border-[#f0e7e1] bg-white p-5 shadow-sm dark:border-[#312922] dark:bg-[#131313]">
                                        <p className="text-xs uppercase tracking-[0.24em] text-[#7b7468] dark:text-[#9b958b]">
                                            Progreso
                                        </p>
                                        <div className="mt-4 flex items-center justify-between text-2xl font-semibold text-[#1b1b18] dark:text-[#f8f6f1]">
                                            <span>85%</span>
                                            <span className="rounded-full bg-[#d8e7ff] px-2.5 py-1 text-xs font-semibold text-[#1746c8] dark:bg-[#1d2f63] dark:text-[#c8d8ff]">
                                                En tiempo real
                                            </span>
                                        </div>
                                        <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#dfe7ff] dark:bg-[#122646]">
                                            <div className="h-full w-5/6 rounded-full bg-[#0d3d9b] dark:bg-[#bfd0ff]" />
                                        </div>
                                    </div>
                                    <div className="rounded-[1.75rem] border border-[#f0e7e1] bg-white p-5 shadow-sm dark:border-[#312922] dark:bg-[#131313]">
                                        <p className="text-xs uppercase tracking-[0.24em] text-[#7b7468] dark:text-[#9b958b]">
                                            Experiencia
                                        </p>
                                        <p className="mt-4 text-3xl font-semibold text-[#1b1b18] dark:text-[#f8f6f1]">
                                            860 XP
                                        </p>
                                        <p className="mt-3 text-sm leading-6 text-[#5f5b52] dark:text-[#bfb9af]">
                                            Completa tareas para subir de nivel y mejorar tu personaje
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </main>
                     
                    <section style={{ marginTop: '30px' }} className="grid gap-6 pb-10 md:grid-cols-3">
                        <article className="rounded-[2rem] border border-[#e7e3dd] bg-white p-8 shadow-sm dark:border-[#2d2b28] dark:bg-[#141414]">
                            <h2 className="text-lg font-semibold">Sistema de niveles</h2>
                            <p className="mt-3 text-sm leading-6 text-[#5f5b52] dark:text-[#bfb9af]">
                                Sube de nivel por cada tarea completada y desbloquea recompensas para tu personaje.
                            </p>
                        </article>
                        <article className="rounded-[2rem] border border-[#e7e3dd] bg-white p-8 shadow-sm dark:border-[#2d2b28] dark:bg-[#141414]">
                            <h2 className="text-lg font-semibold">Mejora tus hábitos</h2>
                            <p className="mt-3 text-sm leading-6 text-[#5f5b52] dark:text-[#bfb9af]">
                                Cambia tu lista de tareas aburrida por una aventura épica llena de elementos únicos que te motivarán.
                            </p>
                        </article>
                        <article className="rounded-[2rem] border border-[#e7e3dd] bg-white p-8 shadow-sm dark:border-[#2d2b28] dark:bg-[#141414]">
                            <h2 className="text-lg font-semibold">Organización clara</h2>
                            <p className="mt-3 text-sm leading-6 text-[#5f5b52] dark:text-[#bfb9af]">
                                Mantén tus tareas, objetivos y hábitos en un solo lugar para no perder nunca el hilo.
                            </p>
                        </article>
                    </section>
                </div>
            </div>
        </>
    );
}
