
	const body = document.querySelector('.screen');
	const mail = document.getElementById('mail');
	{
		
		mail.addEventListener('mousedown', onClickByMail);
		mail.addEventListener('touchstart', onClickByMail);

		document.addEventListener('mousemove', drawHeart)
		document.addEventListener('touchstart', drawHeart)
		document.addEventListener('touchmove', drawHeart)

	}
		let timer = new Date();
		function drawHeart(e){
			if(new Date() - timer < 40) return;
			else {
				timer = new Date();
				const touches = e.touches;
				const x = touches && touches[0] ? touches[0].clientX : e.clientX;
				const y = touches && touches[0] ? touches[0].clientY : e.clientY;
				const heart = createHeartElement(x, y);
				body.appendChild(heart);
				
				setTimeout(()=> {
					heart.remove();
				}, 3500)
			}
		}
		function onClickByMail (e) {
			try{
				mail.removeEventListener('mousedown', onClickByMail);
				mail.removeEventListener('touchstart', onClickByMail);
				
				const textItems = document.querySelectorAll('.text_item');
				const text_1 = document.getElementById("text_1");
				mail.classList.add('active_mail');
				if(mail.classList.value === 'mail active_mail') return;
				mail.classList.remove('mail_hover');
				textItems.forEach((item, index)=>{
				item.classList.add(`text_${index+1}`);
				item.classList.remove('hidden');
				setTimeout(()=>{
					document.removeEventListener('mousemove', drawHeart);
					document.removeEventListener('touchstart', drawHeart);
					document.removeEventListener('touchmove', drawHeart);
					let i = 1;
					const aLotOfHeart = setInterval(()=>{
						
						if(i > 250) {
							afterMailAnimation(aLotOfHeart, mail, body);
							return;
						}
						
						const heart = createHeartElement(Math.random()*body.clientWidth, Math.random()*body.clientHeight, 20);
						body.appendChild(heart);
						i++;
						setTimeout(()=> {
							heart.remove();
						}, 3500);
					},10)
					return;
				}, 17000)
			})
			}catch(error){alert('Something went wrong'); console.error(error)}
		}
		

		function afterMailAnimation(aLotOfHeart, mail, body){
			mail.classList.add('mail_hidding');
			setTimeout(()=>{
				mail.remove();
			}, 1000);
			clearInterval(aLotOfHeart);
			const clouds = document.querySelector('.clouds');
			clouds.classList.remove('hidden');
			let iImg = 1;
			const imgWrapper = document.querySelector('div.img_wrapper');
			if(imgWrapper){
				
				imgWrapper.classList.remove('hidden');
				
				document.addEventListener('mousemove', drawHeart);
				document.addEventListener('touchstart', drawHeart);
				document.addEventListener('touchmove', drawHeart);
				
				const collection = Array.from(imgWrapper.children);
				for(let item of collection){
					if(item.classList.value === 'img_card') return;
					item.classList.add('img_card');
				}
				
				setTimeout(()=>{document.location.reload(true)}, 40000);
			}
			else document.location.reload(true);
		}

		function createHeartElement(x, y, minSize = 0) {
			
			const heart = document.createElement('span');
			const size = Math.random()*80 + minSize;
			
			heart.style.left = x + 'px';
			heart.style.top = y + 'px';
			
			heart.style.width = size + 'px';
			heart.style.height = size + 'px';
			heart.classList.add('heart_item');
			
			return heart;
		}
