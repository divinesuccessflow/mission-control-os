export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      document.body.removeChild(textArea);
      return true;
    } catch (err) {
      document.body.removeChild(textArea);
      return false;
    }
  }
};

export const showToast = (message: string, duration: number = 2000) => {
  // Remove existing toast if any
  const existingToast = document.getElementById('copy-toast');
  if (existingToast) {
    existingToast.remove();
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.id = 'copy-toast';
  toast.className = 'fixed bottom-8 right-8 bg-gold text-black px-6 py-3 rounded-lg shadow-lg font-semibold z-50 animate-slide-up';
  toast.textContent = message;
  
  document.body.appendChild(toast);
  
  // Remove after duration
  setTimeout(() => {
    toast.classList.add('opacity-0');
    setTimeout(() => toast.remove(), 300);
  }, duration);
};

export const copyWithToast = async (text: string, successMessage: string = 'Copied!') => {
  const success = await copyToClipboard(text);
  if (success) {
    showToast(successMessage);
  } else {
    showToast('Failed to copy');
  }
};
