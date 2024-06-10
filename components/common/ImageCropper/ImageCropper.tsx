'use client';

import ReactCropper, { ReactCropperElement } from 'react-cropper';
import { Button } from '@/components/ui/button';
import { createRef } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';

export type ImageCropperProps = {
  image: Blob | undefined;
  handleSave: (blob: Blob) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const ImageCropper = ({
  image,
  handleSave,
  open,
  onOpenChange,
}: ImageCropperProps) => {
  const cropperRef = createRef<ReactCropperElement>();

  const src = image ? URL.createObjectURL(image) : undefined;

  const handleSaveCrop = () => {
    cropperRef.current?.cropper.getCroppedCanvas().toBlob((blob) => {
      if (blob) {
        handleSave(blob);
        onOpenChange(false);
      }
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={'p-8'}>
        <div className={'flex flex-col gap-2 w-full items-start'}>
          <ReactCropper
            ref={cropperRef}
            className={'w-full h-halfPageWithoutHeader'}
            zoomTo={0.5}
            aspectRatio={4 / 3}
            preview=".img-preview"
            src={src}
            viewMode={1}
            minCropBoxHeight={10}
            minCropBoxWidth={10}
            background={false}
            responsive={true}
            autoCropArea={1}
            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
            guides={true}
          />
          <Button type={'button'} onClick={handleSaveCrop}>
            Rogner
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
