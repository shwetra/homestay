'use client'
import React, { FC, useState } from 'react'

export interface PageAddListing7Props {}

const PageAddListing7: FC<PageAddListing7Props> = () => {
  // State to track the number of bedroom and bathroom input fields
  const [bedrooms, setBedrooms] = useState<string[]>(['']); // Initially 1 bedroom input
  const [bathrooms, setBathrooms] = useState<string[]>(['']); // Initially 1 bathroom input

  // Function to handle adding new bedroom input (file input)
  const addBedroomInput = () => {
    setBedrooms((prevBedrooms) => [...prevBedrooms, '']);
  };

  // Function to handle adding new bathroom input (file input)
  const addBathroomInput = () => {
    setBathrooms((prevBathrooms) => [...prevBathrooms, '']);
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Pictures of the place</h2>
        <span className="mt-2 block text-neutral-500 dark:text-neutral-400">
          A few beautiful photos will help customers have more sympathy for your
          property.
        </span>
      </div>

      <div className="space-y-2">
        {/* Cover Image Section */}
        <div style={{ marginTop: '-1rem' }}>
          <span className="text-lg font-semibold">Cover image</span>
          <div className="mt-5">
            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-neutral-300 px-6 pb-6 pt-5 dark:border-neutral-600">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-neutral-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <div className="flex text-sm text-neutral-600 dark:text-neutral-300">
                  <label
                    htmlFor="file-upload"
                    className="text-primary-600 relative cursor-pointer rounded-md font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>
        </div>

		
        {/* Bedroom Picture Section */}
        <div className='pt-5'>
          <span className="text-lg font-semibold">Bedroom Pictures</span>
          <div className="grid sm:grid-cols-2 gap-3 mt-5">
            {bedrooms.map((_, index) => (
              <div key={index} className="mt-1 flex justify-center rounded-md border-2 border-dashed border-neutral-300 px-6 pb-6 pt-5 dark:border-neutral-600">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-neutral-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <div className="flex text-sm text-neutral-600 dark:text-neutral-300">
                    <label
                      htmlFor={`bedroom-file-upload-${index}`}
                      className="text-primary-600 relative cursor-pointer rounded-md font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id={`bedroom-file-upload-${index}`}
                        name={`bedroom-file-upload-${index}`}
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            ))}

            {/* "+" button to add another bedroom file input */}
            <div className="mt-4 text-center">
              <button
                onClick={addBedroomInput}
                className="flex items-center justify-center space-x-2 rounded-full border border-neutral-300 bg-neutral-100 py-2 px-4 text-neutral-600 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                <span className="font-semibold">+</span>
                <span>Add Another Bedroom Picture</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bathroom Picture Section */}
        <div className='pt-5'>
          <span className="text-lg font-semibold">Bathroom Pictures</span>
          <div className="grid sm:grid-cols-2 gap-3 mt-5">
            {bathrooms.map((_, index) => (
              <div key={index} className="mt-1 flex justify-center rounded-md border-2 border-dashed border-neutral-300 px-6 pb-6 pt-5 dark:border-neutral-600">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-neutral-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <div className="flex text-sm text-neutral-600 dark:text-neutral-300">
                    <label
                      htmlFor={`bathroom-file-upload-${index}`}
                      className="text-primary-600 relative cursor-pointer rounded-md font-medium focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id={`bathroom-file-upload-${index}`}
                        name={`bathroom-file-upload-${index}`}
                        type="file"
                        className="sr-only"
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            ))}

            {/* "+" button to add another bathroom file input */}
            <div className="mt-4 text-center">
              <button
                onClick={addBathroomInput}
                className="flex items-center justify-center space-x-2 rounded-full border border-neutral-300 bg-neutral-100 py-2 px-4 text-neutral-600 hover:bg-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                <span className="font-semibold">+</span>
                <span>Add Another Bathroom Picture</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageAddListing7;
