const Modal = (props: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { setOpen } = props;
  return (
    <>
      <div className="fixed top-0 bottom-0 left-0 right-0 bg-gray-500 opacity-65"></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-10 px-20 rounded-lg shadow-2xl">
        <h1 className="text-center text-2xl font-semibold">Birthday's Today</h1>
        <div className="flex items-center gap-7 my-5">
          <div className="relative overflow-hidden rounded-[50%] w-20 h-20">
            <img
              src="https://www.wilsoncenter.org/sites/default/files/media/images/person/james-person-1.jpg"
              alt=""
              className="min-w-full min-h-full w-auto h-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-medium">Krish Marsonia</h1>
            <h1 className="text-base">22 years</h1>
          </div>
        </div>
        <center>
          <button onClick={() => setOpen(false)} className="py-1.5 px-2 bg-red-600 text-white rounded-md font-medium my-1">Close</button>
        </center>
      </div>
    </>
  );
};

export default Modal;
