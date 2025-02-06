import TableBook from '../../components/TableBook';

export default function Buku() {
    const booksData = [
        {
            id: 1,
            judul: 'Buku A',
            penulis: 'Penulis A',
            isbn: '12345',
            penerbit: 'Penerbit A',
            tahun_terbit: 2020,
            genre: 'Fiksi',
            harga: 50000,
            stok: 10,
        },
        {
            id: 2,
            judul: 'Buku B',
            penulis: 'Penulis B',
            isbn: '67890',
            penerbit: 'Penerbit B',
            tahun_terbit: 2021,
            genre: 'Non-Fiksi',
            harga: 60000,
            stok: 5,
        },
    ];
    return <TableBook books={booksData} />;
}
