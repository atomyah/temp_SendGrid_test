import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

import Layout from "../components/layout"
import Seo from "../components/seo"

export default function FormPage() {
    const [value, setValue] = React.useState({})
    const [serverResponse, setServerResponse] = React.useState(``)

    // Listen to form changes and save them.
    function handleChange(e) {
        value[e.target.id] = e.target.value
        setServerResponse(``)
        setValue({ ...value })
        console.log('■ value')
        console.log(value)
    }

    // When the form is submitted, send the form values
    // to our function for processing.
    async function onSubmit(e) {
        e.preventDefault()
        const response = await window
        .fetch(`/api/send`, {
            method: `POST`,
            headers: {
            "content-type": "application/json",
            },
            body: JSON.stringify(value),
        })
        .then(res => res.json())
        setServerResponse(response)
        console.log('■ response')
        console.log(response)
    }


    return (
        <Layout>
            <Seo title="お問い合わせ" />

            {/* コンテナ */}
            <div class="container w-full grid grid-cols-12 mx-auto gap-2">

            {/* 表題ブロック */}
                <div class="col-span-12 bg-indigo-400 text-xl text-white p-2 mt-10">
                    お問い合わせ
                </div>

            {/* フォームブロック */}
                <div class="col-start-2 col-span-10 p-3">
                    <form onSubmit={onSubmit} method="POST" action="/api/send" enctype="multipart/form-data">
                        <div class="form-group mb-6">
                        <label for="formName" class="form-label inline-block mb-2 text-gray-700">お名前</label>
                            <input type="text" id="formName" value={value['formName'] || ``} onChange={handleChange}
                                class="form-control block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white
                                border border-solid border-gray-300
                                rounded
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="例：鈴木太郎" />
                        </div>
                        <label for="formEmail" class="form-label inline-block mb-2 text-gray-700">メールアドレス</label>
                        <div class="form-group mb-6">
                            <input type="email" id="formEmail" value={value['formEmail'] || ``} onChange={handleChange}
                                class="form-control block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white
                                border border-solid border-gray-300
                                rounded
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                placeholder="例：atom@yah-space.work" />
                        </div>
                        <label for="formTextarea" class="form-label inline-block mb-2 text-gray-700">メッセージ</label>
                        <div class="form-group mb-6">
                            <textarea id="formTextarea" value={value['formTextarea'] || ``} onChange={handleChange}
                            class="
                                form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white
                                border border-solid border-gray-300
                                rounded
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                            "
                            rows="3"
                            placeholder=""
                            ></textarea>
                        </div>
                        <div class="form-group mb-12">
                        <label for="formFile" class="form-label inline-block mb-2 text-gray-700">添付ファイル</label>
                            <input type="file" id="formFile" value={value['formFile'] || ``} onChange={handleChange}
                                class="form-control
                                block
                                w-full
                                px-3
                                py-1.5
                                text-base
                                font-normal
                                text-gray-700
                                bg-white
                                border border-solid border-gray-300
                                rounded
                                m-0
                                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
                        </div>

                        <div class="form-group mb-2">
                            <button type="submit" class="
                                w-2/12
                                px-6
                                py-2.5
                                bg-blue-700
                                border-2
                                border-solid
                                border-indigo-600
                                text-white
                                font-medium
                                text-lg
                                leading-tight
                                rounded
                                shadow-md
                                hover:bg-indigo-400 hover:shadow-lg
                                active:bg-blue-800 active:shadow-lg
                                transition
                                duration-150">送 信</button>
                        </div>
                    </form>

                </div>
            </div>
        </Layout>
    )

}

