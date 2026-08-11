import { Router } from "express";
import OpenAI from 'openai'
import { JobModel } from "../models copy/job";

process.loadEnvFile()

export const aiRouter = Router({
    apiKey: process.env.OPENAI_API_KEY
})

aiRouter.get('summary/:id', async (req, res) => {
    const { id } = req.params
    const job = await JobModel.getById(id)

    if (!job) {
        return res.status(404).json({ error: 'Job not Found' })
    }

    const promt =[
        `Resume en 4-6 frases la siguiente oferta de trabajo:`,
        `incluye: rol, empresa. ubicacion y requisitos clave`,
        `usa un tono claro y directo en español`,
        `Titulo: ${job.titulo}`,
        `Empresa: ${job.empresa}`,
        `Ubicacion: ${job.ubicacion}`,
        `Descripcion: ${job.descripcion}`        
    ].join('\n')

    try { 
        const completion = await openia.chat.completion.create({
            message: [
                {
                    role: 'user',
                    content: promt
                }
            ]
        })
        console.log("OpenAI Respnoeseeeeee");
        const summary = completion.choise?.[0]?.message?.content?.trim()

        if (!summary) {
            return res.status(502).json({ error: 'No summary generated'})
        }

        return res.json({summary})
        
    } catch(error) {
        return res.status(500).json({ error: 'error generating summary'})
    }
})











