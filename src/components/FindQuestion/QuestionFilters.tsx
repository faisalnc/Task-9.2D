export default function QuestionFilters(props:{
  term:string; setTerm:(v:string)=>void;
  tag:string; setTag:(v:string)=>void;
  dateFrom:string; setDateFrom:(v:string)=>void;
}) {
  const { term,setTerm, tag,setTag, dateFrom,setDateFrom } = props;
  return (
    <section className="grid gap-3 sm:grid-cols-3">
      <input className="border p-2 rounded" placeholder="Search title"
        value={term} onChange={e=>setTerm(e.target.value)} />
      <select className="border p-2 rounded" value={tag} onChange={e=>setTag(e.target.value)}>
        <option value="all">All tags</option>
        <option value="frontend">Frontend</option>
        <option value="backend">Backend</option>
        <option value="devops">DevOps</option>
        <option value="uiux">UI/UX</option>
        <option value="other">Other</option>
      </select>
      <input type="date" className="border p-2 rounded"
        value={dateFrom} onChange={e=>setDateFrom(e.target.value)} />
    </section>
  );
}
