import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const wasmSource = 'sorosan_dice.wasm'
const wasmDirectory = path.resolve('./public/contracts', wasmSource);
const content: Buffer = fs.readFileSync(wasmDirectory);

export async function POST(request: NextRequest) {
  return new NextResponse(new Blob([content], { type: "application/wasm" }));
}