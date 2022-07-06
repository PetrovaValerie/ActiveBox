
// Этот код помогает определить на каком устр-ве открыта стр-ца. 
// Здесь понятно открыта страница на touch-screen 
// или с исп-ем мыши.
// Фактически мы определяем операционную систему и браузер.
// Т.о. можем выяснить открыто с пом-ю моб устр-ва либо на ПК.
"use strict"
const isMobile = {
	Android: function () {
		return navigator.userAgent.match(/Android/i);
	},
	Blackberry: function () {
		return navigator.userAgent.match(/Blackberry/i);
	},
	iOS: function () {
		return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return navigator.userAgent.match(/Opera Mini/i);
	},
	Windows: function () {
		return navigator.userAgent.match(/IEMobile/i); 
	},
	any: function () {
		return (
			isMobile.Android() || 
			isMobile.Blackberry() || 
			isMobile.iOS() || 
			isMobile.Opera() || 
			isMobile.Windows());
	}
};
// при условии, когда определилось моб устр-во,
// при клике на стрелку выпадает под-меню
	if (isMobile.any()) {
		document.body.classList.add('_touch');

		let menuArrows = document.querySelectorAll('.menu__arrow');
		if (menuArrows.length > 0) {
			for (let index = 0; index < menuArrows.length; index++) {
				const menuArrow = menuArrows[index];
				menuArrow.addEventListener("click",function(e) {
					menuArrow.parentElement.classList.toggle('_active');
// теперь нам нужно привязаться к этому классу _active,
// который появляется при клике на стрелку
// и с помощью стилей анимировать эту стрелочку
				});
			}
		}

	} else {
		document.body.classList.add('_pc');
	}










	
	
	// Меню бургер
	const iconMenu = document.querySelector('.menu__logo');
	const menuBody = document.querySelector('.menu__body');
	if (iconMenu) {
// создаю событие клик по иконке
// запретим скроллить страницу при открытом меню
		iconMenu.addEventListener("click", function (e) {
			// document.body.classList.toggle('_lock');
			iconMenu.classList.toggle('_active');
			menuBody.classList.toggle('_active');
		});
	}


// Прокрутка при клике

// Собираю массив объектов, которые будут учавствовать в навигации
// т.е. собрать массив ссылок у которых есть дата-атрибут data-goto=".page__section_1" 

const menuLinks = document.querySelectorAll('.menu__item_link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});
// здесь нам нужно получить объект, на который мы кликаем

// Проверка важных условий: 
// ---заполнен ли дата-атрибут
// ---существует ли объект на  который ссылается данный дата-атрибут
	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
// ---Нам нужно высчитать положение этого объекта обязательно с учетом высоты шапки
// с помощью getBoundingClientRect().top получим расстояниие от верха этого объекта,
// т.о. получаю его местоположение на странице в пикселях
// И прибавляю кол-во прокрученых пикселей, используя переменную pageYOffset либо scrollY по оси Y
// А затем отнимаю высоту шапки с пом-ю offsetHeight
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;



// Закрытие бургер-меню при попадании на раздел после клик-скрола
			if (iconMenu.classList.contains ('_active')) {
				document.body.classList.remove('_lock');
				iconMenu.classList.remove('_active');
				menuBody.classList.remove('_active');
			}


// Заставляю скролл прокрутиться к нужному месту			
// и прокрутка будет плавной
			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
// Не переходит по ссылке, только выполняет плавную прокрутку до секции
			e.preventDefault();
		}
	}
}