import { Button, Input } from "@/components"
import { Label } from "@/components/ui/label"

export const DollarBottom = () => {
    return (
        <div>
            <div className="w-full h-52 relative bg-white/0 rounded-xl outline outline-2 outline-offset-[-2px] outline-yellow-400 mt-8 px-4 py-3">
                <Label className="text-yellow-400">Olingan pul</Label>
                <Input placeholder="Summa kiriting" className="bg-white border border-yellow-400" defaultValue={"300 000"} />
                <h4 className="text-white text-sm font-semibold font-['Inter'] leading-none mt-5">Qoldiq: 200 000</h4>
                <div className="mt-5 flex justify-end">
                    <Button className="w-28 h-8 pl-7 pr-9 pt-1.5 pb-4 bg-yellow-400 rounded-lg outline outline-1 outline-offset-[-1px] outline-yellow-400 inline-flex flex-col justify-start items-start gap-3 text-[#1B2B56] hover:bg-yellow-400">Kiritish</Button>
                </div>
            </div>
        </div>
    )
}