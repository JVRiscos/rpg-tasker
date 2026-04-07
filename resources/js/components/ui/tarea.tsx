type TareaFrencuencia = {
    frequency: 'once' | 'daily' | 'weekly' | 'monthly';
};

export function Tarea( {frequency}: TareaFrencuencia ) {
    const color = 
        frequency === 'once' ? 'var(--accent)' :
        frequency === 'daily' ? 'var(--primary)' :
        frequency === 'weekly' ? 'var(--secondary)' : 
        frequency === 'monthly' ? '#228B22' :
        'var(--muted)';
        
    return (
        <>
            <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
            />
            <style>{`
                    
                    .quest-card {
                        background: white;
                        border-radius: 12px;
                        padding: 20px;
                        margin-bottom: 10px;
                        display: flex;
                        align-items: center;
                        transition: transform 0.2s;
                        border-left: 5px solid #cbd5e1;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                    }

                    .quest-card:hover {
                        transform: translateX(5px);
                    }

                    .quest-icon {
                        width: 50px;
                        height: 50px;
                        background: #f1f5f9;
                        border-radius: 10px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 1.5rem;
                        margin-right: 20px;
                    }

                    .quest-content {
                        flex: 1;
                    }

                    .quest-content h4 {
                        margin: 0 0 5px 0;
                        color: var(--dark);
                    }

                    .quest-content p {
                        margin: 0;
                        font-size: 0.9rem;
                        color: #64748b;
                    }

                    .quest-reward {
                        text-align: right;
                        min-width: 120px;
                    }

                    .btn-actions {
                        display: flex;
                        gap: 10px;
                        margin-left: 20px;
                    }

                    .btn-icon {
                        background: #f1f5f9;
                        border: none;
                        padding: 10px;
                        border-radius: 8px;
                        cursor: pointer;
                        color: #64748b;
                    }

                    .btn-icon:hover {
                        background: #e2e8f0;
                        color: var(--danger);
                    }

                    .quest-daily {
                        border-left-color: var(--primary);
                    }

                    .reward-xp {
                        color: var(--primary);
                        font-weight: bold;
                        display: block;
                    }
            `}</style>               
            <div className="quest-card quest-main" style={{ borderLeftColor: color }}>
                <div className="quest-icon">
                    <i className="fa-solid fa-code" style={{ color: 'var(--accent)' }} />
                </div>
                <div className="quest-content">
                    <h4>Finalizar Proyecto DAW</h4>
                    <p>Entregar la documentación y el código fuente antes de la fecha límite.</p>
                </div>
                <div className="quest-reward">
                    <span className="reward-xp">+500 INT XP</span>
                    <small>Dificultad: Épica</small>
                </div>
                <div className="btn-actions">
                    <button className="btn-icon" type="button">
                        <i className="fa-solid fa-pen-to-square" />
                    </button>
                    <button className="btn-icon" type="button">
                        <i className="fa-solid fa-trash" />
                    </button>
                </div>
            </div>


        </>
    )
}