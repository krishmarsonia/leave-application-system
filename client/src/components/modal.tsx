import { useGetTodaysBirthday } from "../hooks/userHooks/userHooks";

const thisYear = new Date().getFullYear();

const Modal = (props: { modalCloseHandler: () => void }) => {
  const { modalCloseHandler } = props;
  const { data, isLoading, isError, error } = useGetTodaysBirthday();
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    console.log(error);
    throw new Error("error while fetching birthday's");
  }
  return (
    <>
      <div
        className="fixed top-0 bottom-0 left-0 right-0 bg-gray-500 opacity-65"
        onClick={modalCloseHandler}
      ></div>
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white py-10 px-20 rounded-lg shadow-2xl">
        <h1 className="text-center text-2xl font-semibold">Birthday's Today</h1>
        {data?.data.map((da) => {
          const birthYear = new Date(da.birthday).getFullYear();
          return (
            <div className="flex items-center gap-7 my-5">
              <div className="relative overflow-hidden rounded-[50%] w-20 h-20">
                <img
                  src={da.profileImage}
                  alt={`${da.name}'s image`}
                  className="min-w-full min-h-full w-auto h-auto absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-cover"
                />
              </div>
              <div>
                <h1 className="text-lg font-medium">{da.name}</h1>
                <h1 className="text-base">{thisYear - birthYear} years</h1>
              </div>
            </div>
          );
        })}
        <center>
          <button
            onClick={modalCloseHandler}
            className="py-1.5 px-2 bg-red-600 text-white rounded-md font-medium my-1"
          >
            Close
          </button>
        </center>
      </div>
    </>
  );
};

export default Modal;
