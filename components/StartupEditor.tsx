"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { TagSelector } from "@/components/editor/tagSelector";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GoalEditor, Goal } from "@/components/editor/goalEditor"
import ReactQuill from 'react-quill';
import { DropZone, UploadedImage } from "@/components/editor/dropZone";
import { IncompleteStartup } from '@/types/Startup';
import StartupsProvider, { useStartups } from '@/context/StartupsContext';
import 'react-quill/dist/quill.snow.css';
import '@/fontawesome';

export default function StartupEditor() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState<string>('');
  const [target, setTarget] = useState('')
  const [images, setImages] = useState<UploadedImage[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [goals, setGoals] = useState<Goal[]>([])
  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false)
  const [isGeneratingTags, setIsGeneratingTags] = useState(false)

  const { postStartup } = useStartups();

  const updateDescriptionLineByLine = async (content: string) => {
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      setDescription((prev) => prev + lines[i] + '\n');
      await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust delay as needed
    }
  };

  async function generateDescription() {
    setIsGeneratingDescription(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_OPENAI_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: `{"messages": [{"role": "user", "content": "Your role is to create a Startup description for project titled: '${title}'. You can use simple html tags like <h1> - <h6>, <bold>, <i>, <ol>, <ul> to format it. The description should be engaging and informative."}]}`,
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    setIsGeneratingDescription(false);
    updateDescriptionLineByLine(data.choices[0].message.content.replace('"', "'"));
  };

  const generateTags = async () => {
    setIsGeneratingTags(true);
    const response = await fetch(`${process.env.NEXT_PUBLIC_OPENAI_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: `{"messages": [{"role": "user", "content": "Your role is to create a Startup tags for project titled: '${title}' with description: '${description}'. The tags should be relevant to the project and help users find it. Tag should be a single word and separated by comma. Generate up to 5 tags. Prefere tags from the following list: 'Technology', 'Financees', 'Healthcare', 'Education', 'Food', 'Travel', 'Fashion', 'Entertainment', 'Sports', 'Art', 'Music', 'Gaming'. If there is a tag outside of that list that would fit better, you can use it."}]}`,
    });
    if (!response.ok) {
      setIsGeneratingTags(false);
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const tags = data.choices[0].message.content.split(',');
    setTags(tags);
    setIsGeneratingTags(false);
  };

  async function sendPost() {
    const incompleteStartup: IncompleteStartup = {
      name: title,
      description: description,
      images: images.map((image) => image.file),
      tags: tags,
      location: '',
      website: '', // TODO
      followers: 0
    }

    await postStartup(incompleteStartup);
  }

  // useEffect(() => {
  //   if (!loading && (!user || !userDataObj)) router.push('/login');
  // }, [user])

  return (
    <StartupsProvider>
    <div className="w-[80%] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="space-y-4 md:col-span-7">
          <Card className='shadow-md bg-white'>
            <CardHeader>
              <CardTitle className='flex items-center'>Images</CardTitle>
            </CardHeader>
            <CardContent>
              <DropZone images={images} setImages={setImages} />
            </CardContent>
          </Card>
          <Card className="space-y-2 shadow-md bg-white">
            <CardHeader>
              <CardTitle className='flex items-center'>Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-2'>
                <Label htmlFor="title" className="font-semibold">Startup title</Label>
                <Input
                  id="title"
                  placeholder="Enter your title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className='space-y-2 mt-4'>
                <Label htmlFor="description">
                  Description
                  <Button
                    size="sm"
                    className="ms-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-4 shadow-lg hover:shadow-md transition-all duration-300 hover:from-purple-600 hover:to-pink-600"
                    disabled={title && !isGeneratingDescription && !isGeneratingTags ? false : true}
                    onClick={() => generateDescription()}
                  >{isGeneratingDescription ? '✨ Making magic...' : '✨ Generate with AI'}</Button>
                </Label>
                <div className='relative'>
                  <ReactQuill
                    className='h-64 pb-10'
                    id="description"
                    placeholder="Enter your starter's description"
                    theme="snow"
                    value={description}
                    onChange={(value) => setDescription(value)} />
                </div>

              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-4 md:col-span-5">
          <Card className="shadow-md bg-white">
            <CardHeader>
              <CardTitle className='flex items-center'>New Startup <Button className='ms-auto' onClick={() => sendPost()}>Create</Button></CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mt-4">
                <Label htmlFor="price">Target</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter target funding"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                />
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor='tags'>Tags <Button
                  size="sm"
                  className="ms-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-4 shadow-lg hover:shadow-md transition-all duration-300 hover:from-purple-600 hover:to-pink-600"
                  disabled={title && description.length > 50 && !isGeneratingTags && !isGeneratingDescription ? false : true}
                  onClick={() => generateTags()}
                >{isGeneratingTags ? '✨ Making magic...' : '✨ Sugest Tags'}</Button></Label>
                <TagSelector tags={tags} setTags={setTags} />
              </div>
            </CardContent>
          </Card>
          <div className="space-y-2">
            <GoalEditor goals={goals} setGoals={setGoals} />
          </div>
        </div>
      </div>
    </div>
    </StartupsProvider>
  )
}