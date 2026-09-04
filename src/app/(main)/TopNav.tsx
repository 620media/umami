'use client';
import { Row } from '@umami/react-zen';
import { useNavigation } from '@/components/hooks';
import { BoardSelect } from '@/components/input/BoardSelect';
import { LinkSelect } from '@/components/input/LinkSelect';
import { PixelSelect } from '@/components/input/PixelSelect';

export function TopNav() {
  const { websiteId, linkId, pixelId, boardId, teamId, router, renderUrl } = useNavigation();

  const navigateToEntity = (basePath: string, value: string | number | null) => {
    if (value === null || value === undefined || value === '') {
      return;
    }

    router.push(renderUrl(`${basePath}/${value}`, false));
  };

  const handleLinkChange = (value: string | number | null) => {
    navigateToEntity('/links', value);
  };

  const handlePixelChange = (value: string | number | null) => {
    navigateToEntity('/pixels', value);
  };

  const handleBoardChange = (value: string | number | null) => {
    navigateToEntity('/boards', value);
  };

  // 620: teams button removed; the website switcher lives in the side nav.
  // Only links / pixels / boards still need this bar.
  if (!linkId && !pixelId && !boardId) {
    return null;
  }

  return (
    <Row
      position="sticky"
      top="0"
      alignItems="center"
      justifyContent="flex-start"
      paddingY="2"
      paddingX="3"
      paddingRight="5"
      width="100%"
      zIndex={100}
      backgroundColor="surface-raised"
    >
      <Row alignItems="center">
        {(websiteId || linkId || pixelId || boardId) && (
          <>
            {linkId && (
              <LinkSelect
                linkId={linkId}
                teamId={teamId}
                onChange={handleLinkChange}
                buttonProps={{
                  variant: 'quiet',
                  style: { minHeight: 40, minWidth: 200, maxWidth: 200 },
                }}
              />
            )}
            {pixelId && (
              <PixelSelect
                pixelId={pixelId}
                teamId={teamId}
                onChange={handlePixelChange}
                buttonProps={{
                  variant: 'quiet',
                  style: { minHeight: 40, minWidth: 200, maxWidth: 200 },
                }}
              />
            )}
            {boardId && (
              <BoardSelect
                boardId={boardId}
                teamId={teamId}
                onChange={handleBoardChange}
                buttonProps={{
                  variant: 'quiet',
                  style: { minHeight: 40, minWidth: 200, maxWidth: 200 },
                }}
              />
            )}
          </>
        )}
      </Row>
      <div
        style={{
          position: 'absolute',
          bottom: -16,
          left: 0,
          right: 0,
          height: 16,
          background: 'linear-gradient(to bottom, var(--surface-raised), transparent)',
          pointerEvents: 'none',
        }}
      />
    </Row>
  );
}
