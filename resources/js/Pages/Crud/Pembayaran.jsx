import TableCustomer from "@/Components/Table/TableCustomer";
import TablePembayaran from "@/Components/Table/TablePembayaran";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Pembayaran() {
    const pembayaranData = [
        {
            id_pembayaran: 1,
            tanggal_pembayaran: "2025-02-01",
            total_pembayaran: 500000,
            stat_pembayaran: "Lunas",
            created_at: "2025-02-01 10:00:00",
            updated_at: "2025-02-01 12:00:00",
            id_pesanan: 101,
        },
        {
            id_pembayaran: 2,
            tanggal_pembayaran: "2025-02-02",
            total_pembayaran: 750000,
            stat_pembayaran: "Pending",
            created_at: "2025-02-02 11:00:00",
            updated_at: "2025-02-02 13:00:00",
            id_pesanan: 102,
        },
    ];
    return (
        <AuthenticatedLayout>
            <div className="h-screen w-full overflow-y-scroll">
                <TablePembayaran pembayaran={pembayaranData}></TablePembayaran>
            </div>
        </AuthenticatedLayout>
    );
}
