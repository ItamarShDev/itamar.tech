interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}
export function Input({ label, children, ...props }: IProps) {
    return (
        <div className="container">
            <label>
                {label}
                <input {...props} />
                {children}
            </label>
            <style jsx>
                {`
                    label {
                        display: flex;
                        flex-direction: column;
                        color: var(--colors-text);
                        font-size: 1rem;
                        padding-block-start: 2rem;
                        padding-inline-start: 5px;
                        margin: 2rem 0;
                    }
                    input {
                        color: var(--colors-text);
                        line-height: 4rem;
                        padding: 0 2rem;
                        font-size: 1.5rem;
                        display: flex;
                        align-items: start;
                        flex-direction: column;
                        background-color: var(--colors-inputs);
                        opacity: 0.5;
                        border-radius: 1.5rem;
                        margin-block-start: 1rem;
                    }
                    input:focus,
                    input:hover {
                        opacity: 1;
                    }

                    input,
                    input:focus {
                        outline: none;
                        border: none;
                    }
                `}
            </style>
        </div>
    );
}
