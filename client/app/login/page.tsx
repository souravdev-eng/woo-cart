export default function LoginScreen() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center'>
      <div className='w-2/4 bg-orange-200 flex flex-col items-center'>
        <input
          type='text'
          placeholder='Type your email address'
          className='h-12 w-1/2 p-5 m-4 rounded-md focus:outline-none'
        />
      </div>
    </main>
  );
}
