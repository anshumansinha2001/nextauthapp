export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="my-8">Dynamic Routes</h1>
      <hr />
      <p className="text-base md:text-4xl">
        User ID:-
        <span className=" p-2 ml-2 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </p>
    </div>
  );
}
