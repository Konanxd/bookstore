import TablePengiriman from "@/Components/Table/TablePengiriman";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Pengiriman() {
    const pengirimanData = [
        {
            id_pengiriman: 1,
            id_pembayaran: 1,
            id_pesanan: 1,
            tanggal_pengiriman: "2020",
            status_pengiriman: "terkirim",
            no_resi: 2020,
        },
        {
            id_pengiriman: 2,
            id_pembayaran: 2,
            id_pesanan: 2,
            tanggal_pengiriman: "2020",
            status_pengiriman: "terkirim",
            no_resi: 2020,
        },
    ];
    return (
        <AuthenticatedLayout>
            <div className="h-screen w-full overflow-y-scroll">
                <TablePengiriman pengiriman={pengirimanData}></TablePengiriman>
            </div>
        </AuthenticatedLayout>
    );
}
