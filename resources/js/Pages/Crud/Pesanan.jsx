import TablePesanan from "@/Components/Table/TablePesanan";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Pesanan() {
    const pesananData = [
        {
            id_pesanan: 1,
            id_pelanggan: 2,
            id_buku: 2,
            jumlah_pesanan: 2,
            tanggal_pesanan: "2020",
        },
        {
            id_pesanan: 1,
            id_pelanggan: 2,
            id_buku: 2,
            jumlah_pesanan: 2,
            tanggal_pesanan: "2020",
        },
    ];
    return (
        <AuthenticatedLayout>
            <div className="h-screen w-full overflow-y-scroll">
                <TablePesanan pesanan={pesananData}></TablePesanan>
            </div>
        </AuthenticatedLayout>
    );
}
