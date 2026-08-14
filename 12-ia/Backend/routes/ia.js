import { Router } from "express";
import OpenAI from 'openai'
import { JobModel } from "../models/job.js";
import rateLimit from 'express-rate-limit'

process.loadEnvFile()

const aiRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  message: 'Demasiadas solicitudes',
  legacyHeaders: false,
  standardHeaders: 'draft-8'
})

export const aiRouter = Router()
aiRouter.use(aiRateLimiter)

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,  
});

aiRouter.get('/summary/:id', async (req, res) => {
    const { id } = req.params
    const job = await JobModel.getId({ id });
    console.log("ID buscado:", id, "| Job encontrado:");

    if (!job) {
        return res.status(404).json({ error: 'Job not Found' })
    }

    const prompt = [
      `Resume en 4-6 frases la siguiente oferta de trabajo:`,
      `incluye: rol, empresa. ubicacion y requisitos clave`,
      `usa un tono claro y directo en español`,
      `Titulo: ${job.titulo}`,
      `Empresa: ${job.empresa}`,
      `Ubicacion: ${job.ubicacion}`,
      `Descripcion: ${job.descripcion}`,
    ].join("\n");

  try { 
      
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    res.setHeader('Transfer-Encoding', 'chunked')
        const stream = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          stream: true,
          message: [
            {
              role: "user",
              content: prompt,
            },
          ],
        });
    
      for await (const part of stream) {
        const content = part.choices[0].delta.content
        if (content) {
          res.write(content)
        }
        }
 
    return res.end()
        
  } catch (error) { 
    
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json')
      return res.status(500).json({ error: 'error generating summary'})
    }
      console.log(error);
      return res.end()
    }
})


// Esto funciona, pero no tengo creditos y un agente local como ollama no puedo
// correlo en mi humilde laptop




