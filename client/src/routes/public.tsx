import { useState } from "react";
import Modal from '../components/modal';

const Public = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <h1 className="">Public page</h1>
      {open && <Modal setOpen={setOpen}/>}
      <button onClick={() => setOpen(true)}>Open</button>
    </div>
  );
};

export default Public;
