import { Button, Input } from "@/components"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


interface Props {
    onClose: () => void
}
export const BottomCheck = ({ onClose }: Props) => {
    return (
        <div className="mt-5">
            <div className="w-full h-72 bg-white/0 rounded-xl border-2 border-yellow-400 px-3">
                <div className="mt-2">
                    <Label className="text-yellow-400 text-xs font-semibold font-['Rubik']">Summa</Label>
                    <Input className="bg-white border border-yellow-400" placeholder="Summa kiriting" />
                </div>
                <div className="flex items-center gap-x-5 mt-3">
                    <Label className="text-yellow-400 text-base font-semibold font-['Rubik']">Xarajat:</Label>
                    <RadioGroup defaultValue="comfortable" className="flex items-center">
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="default" id="r1" className="bg-blue-950 text-yellow-400 border border-yellow-400" />
                            <Label htmlFor="r1" className="text-white">Ish haqi</Label>
                        </div>
                        <div className="flex items-center gap-3">
                            <RadioGroupItem value="comfortable" id="r2" className="bg-blue-950 text-yellow-400 border border-yellow-400" />
                            <Label htmlFor="r2" className="text-white">Ish uchun</Label>
                        </div>
                    </RadioGroup>
                </div>
                <div>
                    <Label className="text-yellow-400 text-xs font-semibold font-['Rubik']">Sababi</Label>
                    <Select>
                        <SelectTrigger className="w-full bg-white border border-yellow-400">
                            <SelectValue placeholder="Select a fruit" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="apple">Apple</SelectItem>
                                <SelectItem value="banana">Banana</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div>
                    <Label className="text-yellow-400 text-xs font-semibold font-['Rubik']">Xodim</Label>
                    <Select>
                        <SelectTrigger className="w-full bg-white border border-yellow-400">
                            <SelectValue placeholder="Select a staff" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="apple">Shuhrat (Admin)</SelectItem>
                                <SelectItem value="banana">Izzat (Haydovchi)</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex justify-end mt-5">
                    <Button className="w-16 h-6 bg-yellow-400 rounded-lg text-[#1B2B56] hover:bg-yellow-400" onClick={onClose}>Kiritish</Button>
                </div>
            </div>
        </div>
    )
}