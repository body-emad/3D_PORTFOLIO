import { useForm } from 'react-hook-form'
import { useLoginMutation } from '../../state/slices/AuthSlice'

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [loginUser, { isLoading }] = useLoginMutation()

  const onSubmit = async (data) => {
    try {
      await loginUser(data).unwrap()
      alert('User logged in successfully!')
    } catch (error) {
      alert(error?.data?.message || 'Login failed!')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Sign In
        </h2>
        <div className="mt-4">
          <label className="block text-sm text-gray-600">Email</label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                message: 'Invalid email address',
              },
            })}
            className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm text-gray-600">Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
            className={`w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-2 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded-md hover:bg-blue-600"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}

export default SignIn