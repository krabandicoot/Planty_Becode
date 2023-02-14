import { useState } from "react"

export function GameRules() {

    const [readMore, setReadMore] = useState(false);

    return (
        <section className="ml-8 mr-8">
            <div className="card__container mb-10">
                <h2 className="text-3xl mb-6">Game Rules</h2>
                <p className="text-sm text-justify">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum, minus tempore quasi sit delectus, quos deserunt, eligendi corporis quia labore modi facere eaque? Libero accusamus cum architecto reprehenderit. Vel, cum.
                    Optio vero maxime harum alias aliquid magnam repudiandae mollitia amet odio suscipit eos dolorum molestias maiores similique incidunt eligendi commodi, id nam velit consequuntur? Blanditiis inventore assumenda laboriosam earum sequi?
                    Autem reiciendis architecto harum quisquam tempore impedit quidem rem, quas provident optio labore alias pariatur deserunt delectus aperiam quis mollitia reprehenderit ipsum laborum totam illum. Alias maxime veniam unde similique.
                    <p className={readMore ? " display" : "hide"}>
                        Atque suscipit labore, aliquam ipsa officia commodi quidem fuga reiciendis perspiciatis possimus eligendi quos quaerat voluptatum rerum earum itaque velit delectus autem corporis dolorum deserunt aperiam! Praesentium neque porro consequuntur?
                        Nemo expedita temporibus ipsam cumque laborum porro mollitia, quos laboriosam aut eaque aliquam consequatur quae culpa autem itaque sequi. Necessitatibus id ad, quo natus voluptates vitae. Aut veniam sint quam.
                        Ex quaerat veniam sunt velit doloribus dolorum dicta asperiores libero tenetur atque maiores consequuntur fugiat, nulla numquam, mollitia et nesciunt. Non veritatis autem aspernatur voluptatibus sed consequuntur corrupti laborum modi.
                    </p>
                    <button
                        className="w-min"
                        onClick={() => { readMore ? setReadMore(false) : setReadMore(true) }}>
                        {readMore === false ? "..." : "-"}
                    </button>
                </p>
            </div>
        </section >
    )
}