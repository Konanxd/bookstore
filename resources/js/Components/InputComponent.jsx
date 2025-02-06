export default function InputComponent({
    title = '',
    type = '',
    id = '',
    ...props
}) {
    return (
        <div className="flex flex-col gap-1">
            <h1 className="text-sm font-semibold uppercase">{title}</h1>
            <input
                {...props}
                type={type}
                id={id}
                className="rounded-sm text-sm drop-shadow-sm"
            />
        </div>
    );
}
