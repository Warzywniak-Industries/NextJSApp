'use client'

import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, rectSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { X } from 'lucide-react'

export interface UploadedImage {
  id: string
  file: File
  preview: string
}

function SortableImage({ image, index, removeImage }: { image: UploadedImage; index: number; removeImage: (id: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: image.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative group">
      <img
        src={image.preview}
        alt={`Uploaded ${index + 1}`}
        className="w-full h-32 object-cover rounded-lg shadow-sm"
      />
      <button
        onClick={() => removeImage(image.id)}
        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label={`Remove image ${index + 1}`}
      >
        <X className="w-4 h-4 text-gray-600" />
      </button>
    </div>
  )
}

interface DropZoneProps {
  images: UploadedImage[]
  setImages: (images: (prevImages: UploadedImage[]) => UploadedImage[]) => void
}

export function DropZone(props: DropZoneProps) {

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file)
    }))
    props.setImages((prevImages: UploadedImage[]) => [...prevImages, ...newImages])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': []
    },
    multiple: true
  })

  const removeImage = (id: string) => {
    props.setImages(prevImages => prevImages.filter(image => image.id !== id))
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragEnd = (event: any) => {
    const { active, over } = event

    if (active.id !== over.id) {
      props.setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)

        return arrayMove(items, oldIndex, newIndex)
      })
    }
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary'
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-gray-600">Drag &apos;n&apos; drop some images here, or click to select files</p>
      </div>

      <DndContext 
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={props.images.map(img => img.id)}
          strategy={rectSortingStrategy}
        >
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {props.images.map((image, index) => (
              <SortableImage key={image.id} image={image} index={index} removeImage={removeImage} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}