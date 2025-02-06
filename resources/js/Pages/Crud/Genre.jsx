import TableGenre from '@/Components/Table/TableGenre';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Genre() {
    const genreData = [
        {
            id_genre: 1,
            nama_genre: 'ABBAS',
        },
        {
            id_genre: 2,
            nama_genre: 'ABBAS',
        },
    ];
    return (
        <AuthenticatedLayout>
            <div className="h-screen w-full overflow-y-scroll">
                <TableGenre genre={genreData}></TableGenre>
            </div>
        </AuthenticatedLayout>
    );
}
