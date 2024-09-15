"use client"

import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

const FaqSection: React.FC = () => {
    return (
        <div className="flex flex-col px-8 md:px-[11.25%] justify-center align-middle w-full">
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-texxt semiboldheader3">What's all of this about?</AccordionTrigger>
                    <AccordionContent>
                        This is a platform that helps you build a better product while advertising it to potential investors and customers while providing best practices and resources to help you succeed.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger className="text-texxt semiboldheader3">Is this platform free?</AccordionTrigger>
                    <AccordionContent>
                    Yes. It&apos;s free to use for as long as you want.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger className="text-texxt semiboldheader3">Does it actually make an impact?</AccordionTrigger>
                    <AccordionContent>
                    Of course! We have a dedicated team that is constantly working on new features and improvements to make sure you get the most out of it.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
};

export default FaqSection;