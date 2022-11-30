//JSON file contains the tutorial information such as the instructions and models
const buildComputerTutorial = [
    {
        "key" : 1,
        "title" : "Step 1: CPU",
        "step" : "Welcome, ready to build your PC, the first step is to open the CPU latch on the motherboard, and carefully place the CPU in the bracket, make sure the triangles on the corner matchs, once the CPU fits in snug, put the metal latch down to lock the CPU in place",
    },
    {
        "key" : 2,
        "title" : "Step 2: RAM",
        "step" : "On the RAM area of the motherboard, pull the handles out, place the RAM in the slot, push down until the handles click back into place. Make sure the sticks are aligned correctly.",
    },
    {
        "key" : 3,
        "title" : "Step 3: CPU Fan",
        "step" : "To attach the CPU Fan, if there isn't thermal paste on the fan, place a drop of it on the CPU, place the fan on top of the CPU and screw it in with the screws given from the CPU Fan.",
    },
    {
        "key" : 4,
        "title" : "Step 4: Open Case",
        "step" : "Grab the PC case, and unscrew the sides, we want to open the sides of the PC case to place the components inside. Unscrew and remove both side panels.",
    },
    {
        "key" : 5,
        "title" : "Step 5: PSU Cables",
        "step" : "On the Power Supply, input the required power cables on the back, these are Motherboard, CPU, PCI/E, and SATA, make sure you put the right cables, refer to the manual if you need to.",
    },
    {
        "key" : 6,
        "title" : "Step 6: PSU",
        "step" : "Place the Power Supply in the PSU slot on the PC, the power switch should be exposed from the back of the PC, using the screws provided from the power supply, screw the power supply to the case",
    },
    {
        "key" : 7,
        "title" : "Step 7: Motherboard",
        "step" : "Remove any unwanted standoffs and place the motherboard overtop the existing ones, make sure the number of standoffs are the same as the number of holes on the motherboard that you can screw in, place the motherboard in, screw it, and attach it to the PC Case.",
    },
    {
        "key" : 8,
        "title" : "Step 8: HDD",
        "step" : "If you have a hardrive (HDD), Turn the PC to face the other side, and slide the HDD into the slot indicated above, it should easily slide and lock into place",
    },
    {
        "key" : 9,
        "title" : "Step 9: SDD",
        "step" : "If you have a solid state drive (SDD), place the SDD into the bracket shown above, screw it into place using the screws provided by the SDD bracket.",
    },
    {
        "key" : 10,
        "title" : "Step 10: GPU Covers",
        "step" : "Turn the PC back around to face the side of the motherboard, unscrew and remove the side grill prices where the graphics card will be, don't remove all of them, just the ones needed for the graphics card to poke through",
    },
    {
        "key" : 11,
        "title" : "Step 11: GPU",
        "step" : "On the PCI/E handle, where the graphics card (GPU) will be placed, pull back the handle and place the GPU over it, push it into place until the handle snaps back and locks in the GPU, make sure the HDMI inputs poke through the end of the PC",
    },
    {
        "key" : 12,
        "title" : "Step 12: Power Components",
        "step" : "To add power to the motherboard, CPU and GPU, get the ends of the motherboard cable, CPU cable and PCI/E cable (the ones attached to the PSU) and plug them into the slots shown above, refer to the motherboard manual as well if you have trouble finding the spot to plug the power cables in",
    },
    {
        "key" : 13,
        "title" : "Step 13: Connect HDD and SDD",
        "step" : "Turn the PC around and plug the SATA power (from PSU) and SATA data cable (included with motherboard) into the HDD and SDD, turn the PC around and plug the other ends of the SATA data cable into the motherboard",
    },
    {
        "key" : 14,
        "title" : "Step 14: PC Power Cables",
        "step" : "Plug in the power cables that came with the PC Case, this should allow you to use the input on your PC (Power button and USB), we highly suggest you to refer to the motherboard manual in regards to how you should plug it, as they change per model",
    },
    {
        "key" : 15,
        "title" : "Step 15: Close PC Case",
        "step" : "Finally, screw back in the side panels of the PC, flip the switch on the PSU, plug the PC power cable (comes with the PC), and press on the power button. Congratualtions, you've built PC with custom components, for any issues that occur please use the forum threads to help from our community."
    },
]

//JSON file contains the tutorial information such as the instructions and models
const cleanComputerTutorial = [
    {
        "key" : 1,
        "title" : "Step 1: Open the Computer",
        "step" : "Welcome, ready to clean your computer, first thing to do is to make sure you have a can of compressed air, and a microfiber cloth. Next open the sides of the computer case",
    },
    {
        "key" : 2,
        "title" : "Step 2: Spray Components",
        "step" : "Using the can of compressed air, squeeze the trigger to let the pressured air blow dust, dirt and any other hard martials out of hard of reach places in your pc. Do this on both sides of the pc, be sure to not have the can upside down when squeezing",
    },
    {
        "key" : 3,
        "title" : "Step 3: Spray Fans",
        "step" : "Make sure that you spray the air onto your fans, most of the dust build up is there and is hard to get out, spin and move the fan blades for better exposure. Do this on both sides of the pc.",
    },
    {
        "key" : 4,
        "title" : "Step 4: Wipe PC",
        "step" : "Using the microfiber cloth, wipe down on the surfaces of the pc, removing any dust, dirt of other hard materials. Make sure to clean and wide any surfaces of the PC",
    },
    {
        "key" : 5,
        "title" : "Step 5: Close the Computer",
        "step" : "Finally, screw back in the side panels of the PC and close it. Congratulations, you succussfully cleaned your computer, great job. If any issues occur, please direct to the forum section to get help from the community.",
    }
]

const Tutorials = [
    buildComputerTutorial,
    cleanComputerTutorial
]

export {buildComputerTutorial, cleanComputerTutorial, Tutorials}