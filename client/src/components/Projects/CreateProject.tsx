import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useCreateProjectMutation } from '../../state/slices/ProjectSlice'
import toast from 'react-hot-toast'

const CreateProject = ({ closeModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  const [imagePreview, setImagePreview] = useState(null)
  const [createProject, { isLoading }] = useCreateProjectMutation()

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append(
      'technologies',
      JSON.stringify(data.technologies.split(','))
    )
    if (data.githubLink) formData.append('githubLink', data.githubLink)
    if (data.liveLink) formData.append('liveLink', data.liveLink)
    if (data.image[0]) formData.append('image', data.image[0])

    try {
      await createProject(formData).unwrap()
      toast.success('Project created successfully!')
      reset()
      closeModal()
    } catch (error) {
      console.error('Error creating project:', error)
      toast.error('Error creating project')
    }
  }

  const handleImagePreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.onload = () => setImagePreview(reader.result)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="bg-wihte dark:bg-gray-800 text-gray-900 dark:text-gray-100 p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create New Project</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
        encType="multipart/form-data"
      >
        {/* Project Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Project Title
          </label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Project title is required' })}
            className="border-2 border-gray-300 dark:border-gray-700 rounded-md p-3 w-full bg-white dark:bg-gray-900"
          />
          {errors.title && (
            <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Project Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register('description', {
              required: 'Description is required',
            })}
            className="border-2 border-gray-300 dark:border-gray-700 rounded-md p-3 w-full bg-white dark:bg-gray-900"
          />
          {errors.description && (
            <p className="text-red-600 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Technologies Used */}
        <div>
          <label
            htmlFor="technologies"
            className="block text-sm font-medium mb-2"
          >
            Technologies (comma-separated)
          </label>
          <input
            id="technologies"
            type="text"
            {...register('technologies', {
              required: 'Technologies are required',
            })}
            className="border-2 border-gray-300 dark:border-gray-700 rounded-md p-3 w-full bg-white dark:bg-gray-900"
          />
          {errors.technologies && (
            <p className="text-red-600 text-sm mt-1">
              {errors.technologies.message}
            </p>
          )}
        </div>

        {/* GitHub Link */}
        <div>
          <label
            htmlFor="githubLink"
            className="block text-sm font-medium mb-2"
          >
            GitHub Link
          </label>
          <input
            id="githubLink"
            type="url"
            {...register('githubLink', {
              pattern: {
                value: /^(https?:\/\/)?(www\.)?github\.com\/[^\s]+$/,
                message: 'Invalid GitHub link',
              },
            })}
            className="border-2 border-gray-300 dark:border-gray-700 rounded-md p-3 w-full bg-white dark:bg-gray-900"
          />
          {errors.githubLink && (
            <p className="text-red-600 text-sm mt-1">
              {errors.githubLink.message}
            </p>
          )}
        </div>

        {/* Live Link */}
        <div>
          <label htmlFor="liveLink" className="block text-sm font-medium mb-2">
            Live Link
          </label>
          <input
            id="liveLink"
            type="url"
            {...register('liveLink', {
              pattern: {
                value: /^https?:\/\/[^\s]+$/,
                message: 'Invalid live link',
              },
            })}
            className="border-2 border-gray-300 dark:border-gray-700 rounded-md p-3 w-full bg-white dark:bg-gray-900"
          />
          {errors.liveLink && (
            <p className="text-red-600 text-sm mt-1">
              {errors.liveLink.message}
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium my-2">
            Upload Project Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register('image')}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-gray-200 dark:file:bg-gray-700 file:text-gray-700 dark:file:text-gray-300 hover:file:bg-gray-300 dark:hover:file:bg-gray-600"
            onChange={handleImagePreview}
          />
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-40 h-40 object-cover border border-gray-300 dark:border-gray-700 rounded-md"
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="bg-primary hover:opacity-80 text-white py-2 px-4 rounded-md capitalize font-semibold disabled:opacity-50"
        >
          {isLoading ? 'Submitting...' : 'Create Project'}
        </button>
      </form>
    </div>
  )
}

export default CreateProject
