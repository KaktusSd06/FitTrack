import Image from "next/image";
import { Input } from '@nextui-org/react';
import headerStyles from './header.module.css';
import ownerStyles from './owner.module.css';
import userStyles from './user.module.css';
import footerStyles from './footer.module.css';




const page = () => {
  	return (
		<div className={headerStyles.Parent}>
    		<div className={headerStyles.headerframe}>
      			<img className={headerStyles.headerimage}  alt="" src="/landing/header.png" />
      			<div className={headerStyles.header}>
        				<div className={headerStyles.mainheader}>
          					<div className={headerStyles.logosection}>
            						<Image className={headerStyles.logoframe} width={37} height={32} alt="" src="/landing/logo.svg" />
            						<div className={headerStyles.fittrack}>FitTrack</div>
          					</div>
          					<div className={headerStyles.buttonsection}>
            						<div className={headerStyles.wrapper}>
              							<button className={headerStyles.b}>Головна  </button>
            						</div>
            						<div className={headerStyles.div}>
              							<button className={headerStyles.b}>Увійти</button>
            						</div>
          					</div>
        				</div>
        				<div className={headerStyles.maintextsection}>
          					<div className={headerStyles.bigtext}>
            						<b className={headerStyles.fittrack1}>FitTrack</b>
            						<div className={headerStyles.div2}>Спорт - комфортно для всіх</div>
          					</div>
          					<div className={headerStyles.smalltext}>
            						<div className={headerStyles.div3}>Тренування з комфортом для всіх. Власник - контроль та звітності. Корисутувач - мобільність та доступність</div>
            						<div className={headerStyles.listsection}>
              							<div className={headerStyles.fittrack1}>
                								<ul className={headerStyles.ul}>
                  									<li>· Тренування</li>
                								</ul>
              							</div>
              							<div className={headerStyles.fittrack1}>
                								<ul className={headerStyles.ul}>
                  									<li>· Магазин</li>
                								</ul>
              							</div>
              							<div className={headerStyles.fittrack1}>
                								<ul className={headerStyles.ul}>
                  									<li>· Звітності</li>
                								</ul>
              							</div>
            						</div>
          					</div>
        				</div>
      			</div>
    		</div>
			<div className={ownerStyles.ownerparentframe}>
				<b className={ownerStyles.b}>Для власників спортивних центрів</b>
				
				<img className={ownerStyles.humanframe} width={291} height={542} alt="" src="/landing/human2.svg" />
				
				<div className={ownerStyles.ownerstatsframe}>
					<img className={ownerStyles.flatColorIconsstatistics} width={95} height={95} alt="" src="/landing/stats.svg" />
					<div className={ownerStyles.ownerstatstext}>
						<b className={ownerStyles.b1}>Статистика</b>
						<div className={ownerStyles.div}>Переглядайте статистику та показники ефективності, для комфортного керування спортивним центром</div>
					</div>
				</div>
				<div className={ownerStyles.ownercontrolframe}>
					<img className={ownerStyles.frame} width={95} height={83} alt="" src="/landing/man.svg" />
					<div className={ownerStyles.ownerstatstext}>
						<b className={ownerStyles.b1}>Контроль</b>
						<div className={ownerStyles.div}>Керуйте всіма аспектами власного бізнесу. Нехай адміністрування стане зручнішим</div>
					</div>
				</div>
				<div className={ownerStyles.ownerpersonalframe}>
					<img className={ownerStyles.frame1} width={95} height={109} alt="" src="/landing/woman.svg" />
					<div className={ownerStyles.ownerstatstext}>
						<b className={ownerStyles.b1}>Персонал</b>
						<div className={ownerStyles.div}>Керуйте персоналом зручно. Редагуйте команду тренерів та адміністраторів сервісу</div>
					</div>
				</div>
			</div>
			<div className={userStyles.userparentframe}>
				<b className={userStyles.b}>Переваги користувача</b>
				<img className={userStyles.userhuman} width={334} height={522} alt="" src="/landing/human1.svg" />

				<div className={userStyles.userstats}>
					<img className={userStyles.userstatsicon} width={95} height={95} alt="" src="/landing/stats.svg" />
					<div className={userStyles.userstatstext}>
						<b className={userStyles.b1}>Статистика</b>
						<div className={userStyles.div}>Переглядайте статистику та показники ефективності, для покращення прогресу</div>
					</div>
				</div>
				<div className={userStyles.usertraining}>
					<img className={userStyles.usertrainingicon} width={95} height={77} alt="" src="/landing/dumbell.svg" />
					<div className={userStyles.userstatstext}>
						<b className={userStyles.b1}>Тренування</b>
						<div className={userStyles.div}>Створюйте зручний графік тренувань для себе, та відвідуйте групові тренування в вашому залі</div>
					</div>
				</div>
					<div className={userStyles.usershopping}>
					<img className={userStyles.usershoppingicon} width={95} height={100} alt="" src="/landing/bag.svg" />
					<div className={userStyles.userstatstext}>
						<b className={userStyles.b1}>Зручний шопінг</b>
						<div className={userStyles.div}>Купуйте потрібні товари, найвигідніші абонименти та додаткові послуги прямо у сервісі</div>
					</div>
				</div>
				<div className={userStyles.usermobility}>
					<img className={userStyles.usermobilityicon} width={51} height={95} alt="" src="/landing/telephone.svg" />
					<div className={userStyles.userstatstext}>
						<b className={userStyles.b1}>Мобільність</b>
						<div className={userStyles.div}>Керуйте власними тренуваннями, відслідковуйте показники прямо в застосунку</div>
					</div>
				</div>
			</div>



    		<div className={footerStyles.footerparentframe}>
      			<div className={footerStyles.mainform}>
        				<div className={footerStyles.formtext}>
          					<div className={footerStyles.div}>Зв’яжіться з нами</div>
          					<div className={footerStyles.div1}>Відправте нам свої побажання, або враження від нас</div>
        				</div>
        				<div className={footerStyles.forminputs}>
          					<div className={footerStyles.names}>
            						<div className={footerStyles.fname}>
              							<Input className={footerStyles.div2} />
            						</div>
            						<div className={footerStyles.fname}>
              							<div className={footerStyles.div2}>Ім’я</div>
            						</div>
          					</div>
          					<div className={footerStyles.email}>
            						<div className={footerStyles.div2}>Email</div>
          					</div>
          					<div className={footerStyles.phone}>
            						<div className={footerStyles.div2}>Номер телефону</div>
          					</div>
          					<div className={footerStyles.message}>
            						<div className={footerStyles.div2}>Повідомлення</div>
          					</div>
          					<div className={footerStyles.submit}>
            						<div className={footerStyles.div6}>Відправити</div>
          					</div>
        				</div>
      			</div>
      			<img className={footerStyles.footerimage} width={830} height={500} alt="" src="/landing/footer.png" />
    		</div>
		</div>
		);
};

export default page;
