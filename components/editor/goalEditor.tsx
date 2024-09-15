import { useState } from 'react'
import { PlusCircle, Pencil, Trash2, Car, Plane, HomeIcon, Briefcase, Book } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type Goal = {
    id: number
    title: string
    price: number
    icon: string
    rewards: string[]
}

const initialGoals: Goal[] = [
]

interface GoalEditorProps {
    goals: Goal[]
    setGoals: (goals: Goal[]) => void
}

const iconOptions = ["car", "plane", "home", "briefcase", "book"]

export function GoalEditor(props: GoalEditorProps) {
    const [newGoal, setNewGoal] = useState<Omit<Goal, 'id'>>({ title: '', price: 0, icon: 'car', rewards: [] })
    const [editingId, setEditingId] = useState<number | null>(null)
    const [newReward, setNewReward] = useState('')

    const handleAddGoal = () => {
        if (newGoal.title && newGoal.price > 0) {
            props.setGoals([...props.goals, { ...newGoal, id: Date.now() }])
            setNewGoal({ title: '', price: 0, icon: 'car', rewards: [] })
        }
    }

    const handleEditGoal = (id: number) => {
        const goalToEdit = props.goals.find(goal => goal.id === id)
        if (goalToEdit) {
            setNewGoal(goalToEdit)
            setEditingId(id)
        }
    }

    const handleUpdateGoal = () => {
        if (editingId) {
            props.setGoals(props.goals.map(goal => goal.id === editingId ? { ...newGoal, id: editingId } : goal))
            setNewGoal({ title: '', price: 0, icon: 'car', rewards: [] })
            setEditingId(null)
        }
    }

    const handleDeleteGoal = (id: number) => {
        props.setGoals(props.goals.filter(goal => goal.id !== id))
    }

    const handleAddReward = () => {
        if (newReward) {
            setNewGoal({ ...newGoal, rewards: [...newGoal.rewards, newReward] })
            setNewReward('')
        }
    }

    const handleRemoveReward = (index: number) => {
        setNewGoal({
            ...newGoal,
            rewards: newGoal.rewards.filter((_, i) => i !== index)
        })
    }

    const renderIcon = (iconName: string) => {
        switch (iconName) {
            case 'car': return <Car className="w-6 h-6" />
            case 'plane': return <Plane className="w-6 h-6" />
            case 'home': return <HomeIcon className="w-6 h-6" />
            case 'briefcase': return <Briefcase className="w-6 h-6" />
            case 'book': return <Book className="w-6 h-6" />
            default: return <PlusCircle className="w-6 h-6" />
        }
    }

    return (
        <div>
            <Card className="mb-6 shadow-md bg-white">
                <CardHeader>
                    <CardTitle>{editingId ? 'Edit Goal' : 'Goals'}</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <Input
                            placeholder="Goal Title"
                            value={newGoal.title}
                            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                        />
                        <div className="flex space-x-4">
                            <Input
                                type="number"
                                placeholder="Price"
                                value={newGoal.price}
                                onChange={(e) => setNewGoal({ ...newGoal, price: Number(e.target.value) })}
                            />
                            <Select
                                value={newGoal.icon}
                                onValueChange={(value) => setNewGoal({ ...newGoal, icon: value })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select an icon" />
                                </SelectTrigger>
                                <SelectContent>
                                    {iconOptions.map((icon) => (
                                        <SelectItem key={icon} value={icon}>
                                            {icon}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex space-x-2">
                            <Input
                                placeholder="Add a reward"
                                value={newReward}
                                onChange={(e) => setNewReward(e.target.value)}
                            />
                            <Button onClick={handleAddReward}>Add Reward</Button>
                        </div>
                        <ul className="list-disc pl-5">
                            {newGoal.rewards.map((reward, index) => (
                                <li key={index} className="flex justify-between items-center">
                                    {reward}
                                    <Button variant="ghost" size="sm" onClick={() => handleRemoveReward(index)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </li>
                            ))}
                        </ul>
                        <Button onClick={editingId ? handleUpdateGoal : handleAddGoal}>
                            {editingId ? 'Update Goal' : 'Add Goal'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
            <div className="space-y-4">
                {props.goals.map((goal) => (
                    <Card key={goal.id} className='shadow-md bg-white'>
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                <span>{goal.title}</span>
                                <div className="flex space-x-2">
                                    <Button variant="ghost" size="sm" onClick={() => handleEditGoal(goal.id)}>
                                        <Pencil className="w-4 h-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" onClick={() => handleDeleteGoal(goal.id)}>
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-2 mb-2">
                                {renderIcon(goal.icon)}
                                <span className="font-bold">${goal.price.toLocaleString()}</span>
                            </div>
                            <h3 className="font-semibold mb-1">Rewards:</h3>
                            <ul className="list-disc pl-5">
                                {goal.rewards.map((reward, index) => (
                                    <li key={index}>{reward}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}