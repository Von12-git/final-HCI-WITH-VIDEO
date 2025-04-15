const carModel = document.getElementById("Carmodel");
const sections = Array.from(document.querySelectorAll("section"));

const shiftPositions = [0, -25, -25, 0, 35, 35];
const cameraOrbits = [[90, 90], [-45, 90],[180, 90], [-180, 0], [0, 60]];

const sectionOffsets = sections.map(section => section.offsetTop);
console.log(sectionOffsets);
const lastSectionIndex = sections.length - 1;

const interpolate = (start, end, progress) => start + (end - start) * progress;

const getScrollProgress = (scrollY) => {
    for (let i = 0; i < lastSectionIndex; i++) {
        if (scrollY >= sectionOffsets[i] && scrollY <= sectionOffsets[i + 1]) {
            return i + (scrollY - sectionOffsets[i]) / (sectionOffsets[i + 1] - sectionOffsets[i]);
        }
    }
    return lastSectionIndex;
};

window.addEventListener("scroll", () => {
    const scrollProgress = getScrollProgress(window.scrollY);
    const currentSectionIndex = Math.floor(scrollProgress);
    const sectionProgress = scrollProgress - currentSectionIndex;

    const currentShift = interpolate(
        shiftPositions[currentSectionIndex],
        shiftPositions[currentSectionIndex + 1] ?? shiftPositions[currentSectionIndex],
        sectionProgress
    );

    const currentCameraOrbit = cameraOrbits[currentSectionIndex].map((val, i) =>
        interpolate(val, cameraOrbits[currentSectionIndex + 1]?.[i] ?? val, sectionProgress)
    );

    carModel.style.transform = `translateX(${currentShift}%)`;
    carModel.setAttribute("camera-orbit", `${currentCameraOrbit[0]}deg ${currentCameraOrbit[1]}deg`);
});