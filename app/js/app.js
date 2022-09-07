// $(document).ready(function () {
//     $("body").hide();
// });
const burger = document.querySelector('#burger')
burger.onmousedown = (e) => {
	console.log(document.activeElement)
	if (document.activeElement == e.target) {
		document.activeElement.blur()
		e.preventDefault()
	}
}
const inputFile = document.querySelector("#file")
const inputFileLabel = document.querySelector("#file-label")
const handleFiles = (e) => {
  const fileName = e.target.files[0].name
  inputFileLabel.textContent = fileName
}
inputFile.addEventListener("change", handleFiles)
const thumb = document.querySelector('#thumb')
const range = document.querySelector('#range')
const rangeValue = document.querySelector('#range-value')
let xDown = null
let xStart = null
const initialThumb = () => {
	const thumbWidth = thumb.offsetWidth
	const rangeWidth = range.clientWidth - thumbWidth
	const initValue = parseInt(rangeValue.value) / 100
	const xDiff = rangeWidth * initValue
	const shift = xDiff - thumbWidth
	thumb.style.left = `${shift}px`
}
const handleTouchStartThumb = (e) => {
	xDown = +e.changedTouches[0].clientX
	xStart = parseInt(thumb.style.left)
}
const handleTouchMoveThumb = (e) => {
	const thumbWidth = thumb.offsetWidth
	const rangeWidth = range.clientWidth - thumbWidth
	const xUp = +e.changedTouches[0].clientX	
	const xDiff = xUp - xDown
	const left = xStart + xDiff
	if (left >= 0 && left <= rangeWidth){		
		thumb.style.left = `${left}px`
		const percent = Math.round(left / rangeWidth * 100)
		rangeValue.value = `${percent}%`
	}	
}
thumb.onmousedown = (e) => {
	xDown = +e.pageX
	xStart = parseInt(thumb.style.left)
	document.onmousemove = (e) => {
		const thumbWidth = thumb.offsetWidth
		const rangeWidth = range.clientWidth - thumbWidth
		const xUp = +e.pageX	
		const xDiff = xUp - xDown
		const left = xStart + xDiff
		if (left >= 0 && left <= rangeWidth){		
			thumb.style.left = `${left}px`
			const percent = Math.round(left / rangeWidth * 100)
			rangeValue.value = `${percent}%`
		}	
	}
	document.onmouseup = function() {
		document.onmousemove = null;
		document.onmouseup = null;
	}
}
thumb.addEventListener('touchstart', handleTouchStartThumb)
thumb.addEventListener('touchmove', handleTouchMoveThumb)
thumb.ondragstart = () => {return false}
initialThumb()
const select = document.querySelector("#type-system")
const option = document.querySelectorAll("[data-option]")
const selectEvent = (e) => {
    if (e.type == "click") {
        if (select.classList.contains("form__select--open")) {
            select.classList.remove("form__select--open")
        } else {
            select.classList.add("form__select--open")
        }
    }
    if (e.type == "blur") {
        select.classList.remove("form__select--open")
    }
}
const changeSelectValue = (e) => {
    const value = e.target.innerText
    select.value = value
}
select.addEventListener("blur", selectEvent)
select.addEventListener("click", selectEvent)
option.forEach(elem => elem.addEventListener('click', changeSelectValue))