export default function CrudHead({ title, children, ...props }) {
    return (
        <div className="flex flex-row items-center justify-between gap-10">
            <h1 className="text-2xl font-bold uppercase w-auto">{title}</h1>
            {children}
        </div>
    );
}
