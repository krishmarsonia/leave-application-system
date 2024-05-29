const Punch = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getUTCDay();
  return currentDay !== 0 ? (
    <fieldset className="border border-mavrick border-solid w-1/2">
      <legend className="ml-4 text-mavrick">Attendence</legend>
      <div className="flex justify-center items-center gap-32 m-10">
        <div>
          <button className="px-11 py-7 border-2 border-green-600 rounded-lg text-white bg-green-600 hover:bg-white hover:text-green-600 font-semibold">
            Punch-in
          </button>
        </div>
        <div>
          <button className="px-11 py-7 border border-yellow-500 rounded-lg text-white bg-yellow-500 hover:bg-white hover:text-yellow-500 font-semibold">
            Punch-out
          </button>
        </div>
      </div>
    </fieldset>
  ) : null;
};

export default Punch;
