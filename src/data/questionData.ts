type Question = {
  id: string;
  type?: 'chat' | 'dropdown' | 'options' | 'addlist' | 'currency' | 'calendar';
  text: string;
  options?: string[];
  placeholder?: string;
};

export const QUESTIONS: Question[] = [
  { id: 'name', type: 'chat', text: 'Nama kamu siapa?', placeholder: 'Andrian' },
  { id: 'age', type: 'chat', text: 'Umur kamu berapa?', placeholder: '20' },
  { id: 'city', type: 'dropdown', text: 'Sekarang kamu tinggal di mana?', options: ['Malang', 'Madiun', 'Medan', 'Magelang'] },
  { id: 'status', type: 'options', text: 'Status anda saat ini?', options: ['Mahasiswa', 'Pelajar'] },
  { id: 'bank', type: 'addlist', text: 'Yuk kita input bank kamu apa aja!' },
  { id: 'income', type: 'currency', text: 'Berapa penghasilan bulanan kamu?', placeholder: 'Rp 5.000.000' },
  { id: 'payday', type: 'calendar', text: 'Tanggal pemasukkan kamu tiap tanggal berapa?' },
  { id: 'nabung', type: 'chat', text: 'Kamu biasa nabung berapa perbulan?', placeholder: '100.000' },
  { id: 'target', type: 'chat', text: 'Target kamu menabung berapa tahun?', placeholder: '2' },
];

