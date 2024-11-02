/* eslint-disable react/prop-types */
export default function Footer({ list, countCheck }) {
  if (list.length == 0)
    return <footer className="stats">Daftar belanjaan masih kosong!</footer>;
  const itemTotal = list.length;
  const itemPercentage = Math.round((countCheck / itemTotal) * 100);
  return (
    <footer className="stats">
      Ada {itemTotal} barang di daftar belanjaan, {countCheck} barang sudah
      dibeli ({itemPercentage} %)
    </footer>
  );
}
