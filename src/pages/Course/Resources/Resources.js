import React, { useState } from "react";
import Popup from "reactjs-popup";
import { HiXMark } from "react-icons/hi2";
import "./Resources.css";
const Resources = () => {
	const [showModal, setShowModal] = useState(false);
	const cancelButton = () => {
		setShowModal(false);
	};
	return (
		<>
			<Popup
				trigger={<button className="button"> Open Modal </button>}
				modal
				nested
			>
				{(close) => (
					<div className="modal">
						<button className="close" onClick={close}>
							&times;
						</button>
						<div className="header"> Modal Title </div>
						<div className="content">
							{" "}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a
							nostrum. Dolorem, repellat quidem ut, minima sint vel eveniet
							quibusdam voluptates delectus doloremque, explicabo tempore dicta
							adipisci fugit amet dignissimos?
							<br />
							Lorem ipsum dolor sit amet, consectetur adipisicing elit.
							Consequatur sit commodi beatae optio voluptatum sed eius cumque,
							delectus saepe repudiandae explicabo nemo nam libero ad,
							doloribus, voluptas rem alias. Vitae? Lorem ipsum dolor sit amet
							consectetur adipisicing elit. Nobis, magni voluptatum fugit alias
							possimus saepe aliquid, libero perferendis nisi, omnis neque rerum
							dolore incidunt nesciunt voluptas eos vel recusandae maxime.
							Adipisci, cumque ullam accusantium, omnis veniam tempora officiis
							commodi fuga optio animi quisquam earum, maxime necessitatibus
							voluptates? Est ipsa provident asperiores numquam fuga, earum
							corrupti rerum expedita molestias animi dolorem nihil labore!
							Doloribus voluptate necessitatibus odit perspiciatis, ipsum quae
							harum. Molestias, incidunt corrupti! Repudiandae culpa deserunt,
							eligendi ipsum unde, hic fuga a voluptas ex necessitatibus natus
							praesentium, ipsa itaque alias aperiam explicabo quod aliquid
							saepe quos. Commodi ea nesciunt optio, numquam iste laborum quam
							aperiam dolorum? Harum distinctio a, ullam praesentium voluptatem
							quod ratione ipsa officiis ab facere veniam quaerat velit expedita
							inventore neque ducimus ut possimus, odit culpa! Sunt, modi eaque!
							Atque amet voluptate a aspernatur magnam aperiam ullam, nihil ab
							velit quaerat dicta labore autem sapiente, laboriosam, magni
							distinctio eum inventore est accusamus fuga architecto culpa nisi
							beatae? Soluta assumenda voluptate non id eaque? Obcaecati natus
							tempore distinctio sequi hic sed inventore molestias quia nam!
							Ipsa voluptatem ut laborum deserunt labore iusto adipisci nobis
							quas, cupiditate asperiores sequi reiciendis dicta explicabo cum
							et facere esse! Provident debitis, quis perferendis omnis fugit
							veritatis itaque voluptatibus dolore pariatur natus quasi placeat,
							animi obcaecati asperiores vero. Eveniet quasi voluptatibus
							assumenda necessitatibus iusto nulla illum corrupti eum labore
							doloribus dolore earum similique maiores est obcaecati totam eos
							numquam animi quo incidunt, aliquid ad illo sapiente quos! Vel
							earum ea dicta natus quae libero minima fugit cumque! Saepe,
							eveniet iure sapiente molestiae cum maxime doloremque fugit quis
							qui molestias soluta velit repudiandae. Distinctio voluptatem
							harum, laudantium esse sunt illum eligendi dolorum. Unde sint,
							quibusdam doloribus aspernatur necessitatibus expedita sit quis
							molestias, exercitationem laboriosam deserunt perspiciatis eaque,
							dolore explicabo eligendi! Facilis facere repellendus officia
							tempora impedit illo quo, sunt quidem necessitatibus illum
							perferendis laboriosam voluptas ipsum provident, laudantium
							veritatis deserunt nesciunt. Ratione, at alias eveniet quis, esse
							accusantium ipsa cum ipsam nam modi doloribus impedit unde porro
							molestias nihil. Excepturi eos voluptatibus facere eligendi,
							maiores qui voluptatum ratione nemo voluptas molestias nesciunt
							nisi tenetur quia! Excepturi saepe porro soluta asperiores ipsum
							blanditiis reiciendis magnam! Tempore adipisci non inventore ab
							velit fugiat, voluptatibus voluptate accusamus illo totam hic
							incidunt unde neque delectus quae dolorum, quam, eaque aperiam
							impedit ex nihil accusantium dignissimos. Voluptatibus, ea!
							Eveniet adipisci sint maiores. Est temporibus harum quas
							distinctio quisquam possimus expedita libero magni quae omnis
							ducimus illum recusandae eius in odio ipsum, aperiam neque
							praesentium sit consequuntur optio id inventore doloremque.
							Voluptatibus cupiditate ipsam, autem libero temporibus nobis
							labore fugiat totam aut a voluptatum molestias accusantium odio
							sint maiores vel commodi facere ut quaerat! Voluptate ea expedita
							sequi sapiente odio? Ea, at distinctio delectus, fugit vero ex vel
							natus consequuntur dolorem quisquam quam? Distinctio quam omnis
							assumenda doloribus tempore consequuntur officia ratione sed
							repellendus deleniti eaque, minima cum libero quod quis asperiores
							facilis dolore, ducimus, quaerat aperiam magni dolorum nobis quas?
							Cumque maiores numquam velit ex explicabo assumenda cupiditate! Id
							quas totam, quis doloribus excepturi officiis aliquam dicta
							doloremque reiciendis numquam laborum perferendis molestias libero
							officia atque! Ipsum accusamus suscipit doloremque quam vel
							molestias, optio distinctio reiciendis atque veniam, soluta
							dolorem cum voluptate mollitia harum iusto labore earum, ea
							laboriosam. Dolore eum facere dignissimos odit quaerat blanditiis
							consectetur veniam repellendus laborum eveniet voluptatem enim
							nulla laudantium, aliquid earum architecto iure fugit maiores
							recusandae eaque, alias quos sit sint. Quas commodi iure quasi
							officiis nam, repellendus ratione tempora, sed deserunt autem
							doloribus voluptatem. Consectetur, aut amet quod quis nulla
							repellat fugiat exercitationem qui? Debitis repudiandae facere
							eveniet suscipit nulla, excepturi nesciunt labore rem id, sunt
							voluptas a corrupti doloribus. Quis illo, pariatur laborum omnis
							facere repudiandae assumenda necessitatibus ab provident
							laudantium dolorem quos animi soluta at, corporis vero aperiam.
							Adipisci recusandae quos laborum quod exercitationem culpa minima
							expedita quia amet libero explicabo magni, eaque commodi
							consequuntur consectetur officiis? Molestias veniam quis dolore
							beatae aspernatur? Debitis nam rerum facilis dicta nemo itaque
							quisquam hic quam fuga nobis officia perferendis tempora, expedita
							ipsa accusantium aspernatur vero et similique sapiente? Sed
							cupiditate magnam quia! Nulla placeat architecto consectetur ex
							libero odio ipsam modi eos. Corporis, molestiae! Nam nesciunt quam
							nostrum voluptatem aut sapiente iure doloremque. Amet voluptate
							nulla repudiandae ex repellendus assumenda vero alias
							consequuntur! Deleniti minima magnam vel. Accusantium illo porro
							in repellendus consequuntur praesentium neque minima velit
							provident quisquam sed pariatur exercitationem libero vel veniam
							tempora necessitatibus aliquid dolorem impedit, dignissimos
							maiores earum ea. Quisquam in cumque veniam culpa, natus explicabo
							ipsam enim sequi praesentium nisi expedita et doloremque qui
							impedit. Eius consectetur minus nostrum? Eveniet beatae quo error
							repudiandae mollitia rem quibusdam ipsam numquam nesciunt aliquid
							soluta totam sunt ipsum, dolore saepe qui eos facere modi.
							Laudantium quae ratione deserunt vitae eligendi voluptates ipsum
							eos saepe esse voluptatem ipsa molestiae ut, repudiandae
							accusantium! Veritatis sequi laboriosam qui reprehenderit voluptas
							dolore voluptates ea deleniti sapiente animi ab sit tempora
							obcaecati, saepe quos pariatur quidem architecto, inventore totam
							quae quasi. Hic beatae nulla libero sint quo quod sunt ipsum illum
							totam provident. Iure veniam aliquam quod, eligendi sed officiis,
							fugit iusto tempora praesentium delectus maiores rem voluptates
							labore ipsam provident quo consequatur aliquid, voluptate
							exercitationem similique? Fuga sit atque earum repudiandae, facere
							id, officia, laboriosam fugit porro ut odit voluptate quae!
							Obcaecati cupiditate aliquam beatae, officia autem est aliquid
							consequatur iure, ducimus nam tempora illo ipsam praesentium in,
							soluta nesciunt? Iste ad delectus corporis ullam illum eum sunt
							molestias architecto quis, corrupti et natus! Illum atque sint
							aliquam voluptas dolores porro totam a expedita, officia ullam
							ipsa deleniti laboriosam natus possimus nihil exercitationem ex,
							minus saepe perspiciatis eos temporibus dolorum pariatur?
							Consequatur enim amet, dolorum soluta exercitationem earum
							molestiae sed in recusandae expedita labore deserunt magni quia
							nihil delectus omnis ea iusto! Mollitia dicta, saepe earum minima
							doloremque quibusdam repellat ipsam ullam debitis excepturi dolore
							dolorem eaque ex sed distinctio maxime cum eveniet provident
							voluptatem voluptas eum eius? Enim similique vero consequuntur,
							sit laborum voluptatibus beatae, accusantium mollitia, recusandae
							fugit et sunt saepe?
						</div>
						<div className="actions">
							<Popup
								trigger={<button className="button"> Trigger </button>}
								position="top center"
								nested
							>
								<span>
									Lorem ipsum dolor sit amet, consectetur adipisicing elit.
									Beatae magni omnis delectus nemo, maxime molestiae dolorem
									numquam mollitia, voluptate ea, accusamus excepturi deleniti
									ratione sapiente! Laudantium, aperiam doloribus. Odit, aut.
									lorem100
								</span>
							</Popup>
							<button
								className="button"
								onClick={() => {
									console.log("modal closed ");
									close();
								}}
							>
								close modal
							</button>
						</div>
					</div>
				)}
			</Popup>
			<div className=" w-full text-white">
				{showModal ? (
					<>
						<div className="justify-center items-center  flex  overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
							<div className="relative z-50 my-6 mx-auto w-[90%]">
								{/*content*/}
								<div className="border-0 z-50 relative overflow-auto rounded-lg shadow-lg  flex flex-col w-full bg-pink-900 outline-none focus:outline-none">
									<span
										onClick={cancelButton}
										className="absolute top-3 right-3 cursor-pointer"
									>
										<HiXMark className="w-6 h-6"></HiXMark>
									</span>
									{/*header*/}

									<div className="flex items-start justify-between overflow-auto p-5 border-b border-solid border-slate-200 rounded-t">
										<h3 className="text-3xl font-semibold">
											Lorem ipsum dolor sit.
										</h3>
									</div>
									{/*body*/}
									<div className="relative p-6 w-full flex-auto">
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit.
											In culpa amet, veritatis pariatur esse, id totam ducimus
											consequatur cum, dolores corporis sed. Doloribus eos quam,
											repudiandae quasi reiciendis ratione. Repellendus quod, id
											non ab blanditiis sit unde cumque illo, minus incidunt
											dolores. Atque aliquid facilis officiis blanditiis
											suscipit iusto, illum praesentium saepe tenetur esse! Eos
											maiores omnis quibusdam obcaecati fuga beatae eaque vel
											tempore sed harum ducimus dignissimos aperiam fugit
											laboriosam saepe ipsa vitae sunt, consequuntur repellendus
											ratione in atque? Veniam dignissimos eveniet dolorum
											aperiam eligendi quod deleniti sequi numquam nobis
											quibusdam dolore et quas quo minus, tenetur, asperiores
											recusandae cum? Sed explicabo labore minima illo, quos
											velit sequi nam exercitationem ad odio rerum consequuntur
											voluptas ab deserunt hic quaerat et in, impedit quis
											quidem debitis, qui vitae omnis eius. Atque aspernatur
											autem deserunt reiciendis cum excepturi temporibus,
											officia esse eaque ut illo eum sapiente nesciunt iusto
											quidem nam quaerat at tempora architecto! Modi sit sed
											repellendus voluptas omnis tenetur ipsum temporibus magni
											earum ipsa molestiae culpa similique quis dolorum amet,
											enim eius? Quaerat, quas pariatur rem sit maiores
											molestias et quae eius in, cupiditate numquam. Soluta
											assumenda quia neque, earum quod aliquid libero labore
											rerum possimus, maiores architecto quos. Lorem ipsum dolor
											sit amet Lorem, ipsum dolor sit amet consectetur
											adipisicing elit. Minus, voluptatem, minima quam quaerat
											deleniti quos eaque autem ipsa doloribus saepe animi
											dolorum mollitia, itaque quis repudiandae nam praesentium.
											Veniam deleniti recusandae delectus maiores molestiae ut
											quibusdam, non dicta temporibus aut exercitationem ipsam
											veritatis, minima, provident perferendis eaque illum
											nostrum modi accusamus similique architecto! Laudantium
											corrupti quia, a amet non praesentium numquam cum sint
											dignissimos assumenda cupiditate magnam voluptate! Dolorem
											officiis ex quibusdam dicta laboriosam amet animi magnam
											facilis, autem, inventore dolor natus debitis perspiciatis
											libero iusto maiores vel deserunt aspernatur porro
											similique. Harum voluptates asperiores, sunt ex eius
											similique inventore cupiditate cum excepturi fuga
											voluptate dicta, veniam obcaecati distinctio sint nostrum
											quaerat accusamus dolorem! Repellendus nemo non earum
											maiores ipsa similique suscipit iste facilis consectetur
											maxime, doloremque labore soluta, sapiente ducimus! Ex est
											asperiores molestiae sint eligendi, dolores dignissimos.
											Numquam recusandae praesentium odio, non voluptas porro
											perferendis. Vitae aspernatur consequatur eligendi
											doloribus iste esse, et ut unde. Consectetur amet
										</p>
									</div>
								</div>
							</div>
						</div>
						<div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
					</>
				) : null}
				<div className="grid grid-cols-4 gap-4">
					<div
						onClick={() => setShowModal(true)}
						className="w-56  bg-green-700 cursor-pointer flex shadow-md items-center justify-center p-10 border-2 rounded-md"
					>
						<h3 className="text-xl font-semibold">Questions</h3>
					</div>
					<div className="w-56 bg-green-700 cursor-pointer flex shadow-md items-center justify-center p-10 border-2 rounded-md">
						<h3 className="text-xl font-semibold">Books</h3>
					</div>
					<div className="w-56 bg-green-700 cursor-pointer flex shadow-md items-center justify-center p-10 border-2 rounded-md">
						<h3 className="text-xl font-semibold">Class Notes</h3>
					</div>
					<div className="w-56 bg-green-700 cursor-pointer flex shadow-md items-center justify-center p-10 border-2 rounded-md">
						<h3 className="text-xl font-semibold">Lecture Slide</h3>
					</div>
					<div className="w-56 bg-green-700 cursor-pointer flex shadow-md items-center justify-center p-10 border-2 rounded-md">
						<h3 className="text-xl font-semibold">Suggestions</h3>
					</div>
				</div>
			</div>
		</>
	);
};

export default Resources;
