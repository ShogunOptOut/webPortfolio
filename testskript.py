
import streamlit as st
import time

st.title("👋 Vorstellung – Marvyn Melzer")

st.image("dein_bild.jpg", width=200)

text = "Hallo! Ich bin Marvyn Melzer..."
placeholder = st.empty()

for i in range(len(text)+1):
    placeholder.write(text[:i])
    time.sleep(0.03)
