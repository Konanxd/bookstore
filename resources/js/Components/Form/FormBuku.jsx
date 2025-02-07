import { useState } from "react";
import InputComponent from "../InputComponent";

export default function FormBuku({ book, onSubmit, onCancel }) {
    const [formData, setFormData] = useState({
        judul: book?.judul || "",
        id_penulis: book?.id_penulis || "",
        isbn: book?.isbn || "",
        id_penerbit: book?.id_penerbit || "",
        tahun_terbit: book?.tahun_terbit || "",
        id_genre: book?.id_genre || "",
        harga: book?.harga || "",
        stok: book?.stok || "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmit) onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-zinc-900/80">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center gap-10 rounded-lg bg-white p-10 shadow-lg"
            >
                <h1 className="font-bold uppercase">
                    {book ? "Edit Buku" : "Tambah Buku"}
                </h1>
                <div className="grid w-[800px] grid-cols-2 gap-4 rounded">
                    <InputComponent
                        id="judul"
                        title="Judul"
                        type="text"
                        value={formData.judul}
                        onChange={handleChange}
                    />
                    <InputComponent
                        id="id_penulis"
                        title="ID Penulis"
                        type="text"
                        value={formData.id_penulis}
                        onChange={handleChange}
                    />
                    <InputComponent
                        id="isbn"
                        title="ISBN"
                        type="text"
                        value={formData.isbn}
                        onChange={handleChange}
                    />
                    <InputComponent
                        id="id_penerbit"
                        title="ID Penerbit"
                        type="text"
                        value={formData.id_penerbit}
                        onChange={handleChange}
                    />
                    <InputComponent
                        id="tahun_terbit"
                        title="Tahun Terbit"
                        type="text"
                        value={formData.tahun_terbit}
                        onChange={handleChange}
                    />
                    <InputComponent
                        id="id_genre"
                        title="ID Genre"
                        type="text"
                        value={formData.id_genre}
                        onChange={handleChange}
                    />
                    <InputComponent
                        id="harga"
                        title="Harga"
                        type="number"
                        value={formData.harga}
                        onChange={handleChange}
                    />
                    <InputComponent
                        id="stok"
                        title="Stok"
                        type="number"
                        value={formData.stok}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex w-full flex-row justify-end gap-4">
                    <button
                        className="rounded-md bg-blue-500 px-4 py-2 uppercase text-white"
                        type="submit"
                    >
                        Submit
                    </button>
                    <button
                        className="rounded-md bg-zinc-500 px-4 py-2 uppercase text-white"
                        type="button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
