import { Link, usePage } from '@inertiajs/react';

const BooksTable = () => {
    const { books } = usePage().props; // Get the books data passed by Inertia

    // Handle delete action
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this book?')) {
            destroy(`/buku/${id}`, {
                onSuccess: () => {
                    // No need to manually update state; Inertia will automatically handle it
                    alert('Book deleted successfully!');
                },
                onError: () => {
                    alert('Failed to delete book.');
                },
            });
        }
    };

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Books List</h1>

            <table className="table-bordered table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Judul</th>
                        <th>Penulis</th>
                        <th>ISBN</th>
                        <th>Tahun Terbit</th>
                        <th>Genre</th>
                        <th>Harga</th>
                        <th>Stok</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id_buku}>
                            <td>{book.id_buku}</td>
                            <td>{book.judul}</td>
                            <td>{book.penulis}</td>
                            <td>{book.isbn}</td>
                            <td>{book.tahun_terbit}</td>
                            <td>{book.genre}</td>
                            <td>{book.harga}</td>
                            <td>{book.stok}</td>
                            <td>
                                {/* Edit Button */}
                                <Link
                                    href={`/buku/edit/${book.id}`}
                                    className="btn btn-primary btn-sm"
                                >
                                    Edit
                                </Link>

                                {/* Delete Button */}
                                <button
                                    onClick={() => handleDelete(book.id)}
                                    className="btn btn-danger btn-sm ml-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Add New Book Button */}
            <Link href="/buku/create" className="btn btn-success">
                Add New Book
            </Link>
        </div>
    );
};

export default BooksTable;
