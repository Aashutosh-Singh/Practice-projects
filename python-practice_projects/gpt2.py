import cv2
import numpy as np
import torch
import os

# --- Apply AI anime stylization using AnimeGANv2 ---
def ai_anime_style(img, device="cuda"):
    print("[⚙️] Loading AnimeGANv2...")
    model = torch.hub.load("bryandlee/animegan2-pytorch:main", "generator", pretrained="face_paint_512_v2", trust_repo=True).to(device).eval()
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img_tensor = torch.from_numpy(img_rgb).permute(2, 0, 1).unsqueeze(0).float().div(255).mul(2).sub(1).to(device)

    with torch.no_grad():
        out = model(img_tensor).squeeze(0).permute(1, 2, 0).add(1).div(2).clamp(0, 1).cpu().numpy()

    return cv2.cvtColor((out * 255).astype(np.uint8), cv2.COLOR_RGB2BGR)

# --- Boost saturation + smooth + edge cleanup ---
def post_process(img, sat_scale=1.5, blur_ks=5, edge_thresh=50):
    print("[✨] Post-processing stylized image...")
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV).astype(np.float32)
    hsv[:, :, 1] = np.clip(hsv[:, :, 1] * sat_scale, 0, 255)
    img = cv2.cvtColor(hsv.astype(np.uint8), cv2.COLOR_HSV2BGR)
    img = cv2.bilateralFilter(img, 9, 75, 75)
    img = cv2.medianBlur(img, blur_ks)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    edges = cv2.Laplacian(gray, cv2.CV_8U)
    _, edges = cv2.threshold(edges, edge_thresh, 255, cv2.THRESH_BINARY)
    edges = cv2.medianBlur(edges, 5)
    edges = cv2.bitwise_not(edges)

    return cv2.bitwise_and(img, cv2.cvtColor(edges, cv2.COLOR_GRAY2BGR))

# --- Detect face and create mask ---
def detect_face_mask(img):
    print("[🔍] Detecting face...")
    h, w = img.shape[:2]
    face_mask = np.zeros((h, w), dtype=np.uint8)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    faces = face_cascade.detectMultiScale(gray, 1.1, 5)

    if len(faces) > 0:
        x, y, fw, fh = faces[0]
        padding = int(0.2 * fw)
        x = max(0, x - padding)
        y = max(0, y - padding)
        fw += 2 * padding
        fh += 2 * padding
        cv2.rectangle(face_mask, (x, y), (x + fw, y + fh), 255, -1)
        print(f"[👤] Face detected at: x={x}, y={y}, w={fw}, h={fh}")
        return face_mask
    else:
        print("[⚠️] No face detected.")
        return None

# --- Main pipeline ---
def stylize_with_face_preserved(
    image_path,
    output_path,
    device="cuda",
    sat_scale=1.6,
    blur_ks=5,
    edge_thresh=50,
    face_blend_soft=True,
    soft_blend_strength=10
):
    print(f"[📂] Reading image: {image_path}")
    if not os.path.exists(image_path):
        print("[❌] File not found.")
        return

    img = cv2.imread(image_path)
    if img is None:
        print("[❌] Error loading image.")
        return

    face_mask = detect_face_mask(img)

    # Step 1: Stylize with AnimeGANv2
    anime_img = ai_anime_style(img, device=device)

    # Step 2: Post-process for cartoon/vector feel
    anime_img = post_process(anime_img, sat_scale=sat_scale, blur_ks=blur_ks, edge_thresh=edge_thresh)

    # Step 3: Blend face back in if found
    if face_mask is not None:
        print("[🧠] Preserving original face...")
        face_region = img.copy()
        if face_blend_soft:
            # Apply feathering around face edge
            kernel = np.ones((soft_blend_strength, soft_blend_strength), np.uint8)
            face_mask_blurred = cv2.GaussianBlur(face_mask, (31, 31), 0)
            face_mask_normalized = face_mask_blurred.astype(float) / 255.0
            anime_img = (anime_img * (1 - face_mask_normalized[..., None]) + face_region * face_mask_normalized[..., None]).astype(np.uint8)
        else:
            anime_img[face_mask == 255] = img[face_mask == 255]

    # Step 4: Save the final output
    cv2.imwrite(output_path, anime_img)
    print(f"[✅] Final image saved to: {output_path}")

# --- Run it! ---
stylize_with_face_preserved(
    image_path=r"C:\Users\aashu\Downloads\elon musk.jpg",
    output_path="elon_final_cartoon.png",
    device="cuda",  # use "cpu" if no GPU
    sat_scale=1.7,
    blur_ks=5,
    edge_thresh=50,
    face_blend_soft=True,        # enable smooth blend
    soft_blend_strength=20       # feather radius
)
